const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Simple in-memory cache for AI summaries (expires after 1 hour)
const summaryCache = new Map();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

exports.analyzeReceipt = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const filePath = req.file.path;
    const mimeType = req.file.mimetype;
    
    // Read file
    const fileData = fs.readFileSync(filePath);
    
    // Config Gemini Model
    // Use env variable or default to a commonly available model
    const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash"; 
    const model = genAI.getGenerativeModel({ model: modelName });

    const prompt = `Analyze this image (receipt, bill, or UPI screenshot).
    Determine if this represents an 'income' or an 'expense'.
    Extract the following details:
    - amount: The total amount (number only).
    - date: The date of transaction in ISO format (YYYY-MM-DD). If not found, use today's date.
    - category: A short category name (e.g., Food, Travel, Groceries, Salary, Transfer).
    - source: If income, the source (e.g., Salary, Refund). If expense, use null.
    - description: A brief description of the transaction.
    
    Return the result as a valid JSON object with keys: type (value either 'income' or 'expense'), amount, date, category, source, description.
    Do NOT use markdown formatting (no \`\`\`json). Just the raw JSON string.`;

    const imagePart = {
      inlineData: {
        data: fileData.toString("base64"),
        mimeType: mimeType,
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    console.log("Gemini Response:", text); // Debugging

    let extractedData;
    try {
        // Clean potential markdown just in case
        const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
        extractedData = JSON.parse(jsonStr);
    } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        return res.status(500).json({ message: "Failed to parse AI response", raw: text });
    }

    // Add the file path to the response so the frontend can display it or save it
    // The static middleware serves 'uploads' at '/uploads'
    // filePath is 'uploads\\filename'. 
    // We want '/uploads/filename'
    const relativePath = req.file.filename;
    extractedData.imageUrl = `/uploads/${relativePath}`;

    res.status(200).json(extractedData);

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ message: "Error processing image" });
  }
};

exports.generateFinancialSummary = async (req, res) => {
  try {
    const { incomeData, expenseData, timeRange } = req.body;

    if (!incomeData || !expenseData) {
      return res.status(400).json({ message: "Income and expense data are required" });
    }

    // Create cache key based on user data and time range
    const userId = req.user?.id || 'anonymous';
    const cacheKey = `${userId}-${timeRange}-${incomeData.length}-${expenseData.length}`;
    
    // Check cache first
    const cachedData = summaryCache.get(cacheKey);
    if (cachedData && (Date.now() - cachedData.timestamp) < CACHE_DURATION) {
      console.log('Returning cached AI summary');
      return res.status(200).json(cachedData.data);
    }

    // Calculate totals
    const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
    const totalExpense = expenseData.reduce((sum, item) => sum + item.amount, 0);
    const savings = totalIncome - totalExpense;
    const savingsRate = totalIncome > 0 ? ((savings / totalIncome) * 100).toFixed(2) : 0;

    // Group expenses by category
    const expensesByCategory = expenseData.reduce((acc, item) => {
      const category = item.category || 'Uncategorized';
      acc[category] = (acc[category] || 0) + item.amount;
      return acc;
    }, {});

    // Group income by source
    const incomeBySource = incomeData.reduce((acc, item) => {
      const source = item.source || 'Other';
      acc[source] = (acc[source] || 0) + item.amount;
      return acc;
    }, {});

    // Find top spending category
    const topExpenseCategory = Object.entries(expensesByCategory)
      .sort((a, b) => b[1] - a[1])[0] || ['None', 0];

    // Find top income source
    const topIncomeSource = Object.entries(incomeBySource)
      .sort((a, b) => b[1] - a[1])[0] || ['None', 0];

    const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
    const model = genAI.getGenerativeModel({ model: modelName });

    const prompt = `You are a professional financial advisor. Analyze the following ${timeRange || 'monthly'} financial data and provide personalized insights and actionable tips.

Financial Summary:
- Total Income: ₹${totalIncome.toLocaleString('en-IN')}
- Total Expenses: ₹${totalExpense.toLocaleString('en-IN')}
- Net Savings: ₹${savings.toLocaleString('en-IN')}
- Savings Rate: ${savingsRate}%

Income Sources:
${Object.entries(incomeBySource).map(([source, amount]) => `- ${source}: ₹${amount.toLocaleString('en-IN')}`).join('\n')}

Expense Categories:
${Object.entries(expensesByCategory).map(([category, amount]) => `- ${category}: ₹${amount.toLocaleString('en-IN')} (${((amount/totalExpense)*100).toFixed(1)}%)`).join('\n')}

Top Spending Category: ${topExpenseCategory[0]} (₹${topExpenseCategory[1].toLocaleString('en-IN')})
Top Income Source: ${topIncomeSource[0]} (₹${topIncomeSource[1].toLocaleString('en-IN')})

Please provide:
1. A brief financial health assessment (2-3 sentences)
2. 3-5 specific, actionable tips to improve financial health
3. Identify any concerning spending patterns
4. Suggest areas for potential savings

Return the response as a valid JSON object with the following structure:
{
  "healthAssessment": "string",
  "tips": ["tip1", "tip2", "tip3", ...],
  "concerns": ["concern1", "concern2", ...],
  "savingsOpportunities": ["opportunity1", "opportunity2", ...]
}

Do NOT use markdown formatting. Just return the raw JSON object.`;

    const result = await model.generateContent([prompt]);
    const response = await result.response;
    const text = response.text();

    console.log("Gemini Financial Summary Response:", text);

    let aiSummary;
    try {
      const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
      aiSummary = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      return res.status(500).json({ message: "Failed to parse AI response", raw: text });
    }

    // Add calculated data to the response
    const summaryData = {
      ...aiSummary,
      financialMetrics: {
        totalIncome,
        totalExpense,
        savings,
        savingsRate: parseFloat(savingsRate),
        topExpenseCategory: topExpenseCategory[0],
        topExpenseCategoryAmount: topExpenseCategory[1],
        topIncomeSource: topIncomeSource[0],
        topIncomeSourceAmount: topIncomeSource[1],
        expensesByCategory,
        incomeBySource
      }
    };

    // Cache the result
    summaryCache.set(cacheKey, {
      data: summaryData,
      timestamp: Date.now()
    });

    res.status(200).json(summaryData);

  } catch (error) {
    console.error("Gemini Financial Summary Error:", error);
    
    // Handle rate limit errors specifically
    if (error.status === 429) {
      return res.status(429).json({ 
        message: "AI service rate limit exceeded. Please try again later or use cached data.",
        error: "Rate limit exceeded",
        retryAfter: error.errorDetails?.find(d => d['@type']?.includes('RetryInfo'))?.retryDelay || '60s'
      });
    }
    
    res.status(500).json({ message: "Error generating financial summary", error: error.message });
  }
};
