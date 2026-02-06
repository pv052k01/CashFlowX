# 💰 Finance-Flow

**Finance-Flow** is an AI-powered expense tracking web application built using the **MERN Stack**. It helps users manage income and expenses, visualize financial data, and receive smart AI-driven financial insights.

---

## 🚀 Features Overview

### 🔐 Authentication System
- User registration and login  
- JWT-based secure authentication  
- Profile photo upload  

### 🏠 Dashboard
- Total balance, income, and expense overview  
- Recent transactions display  
- Real-time financial charts  
- 30-day expense analysis  
- 60-day income tracking  

### 💵 Income Management
- Add and manage income entries  
- Filter and view income history  
- Download reports in Excel format  
- Visualize income analytics  
- Delete income records  

### 💸 Expense Management
- Track expenses by category  
- View complete expense history  
- Analyze spending trends  
- Download expense reports (Excel)  
- Delete expense records  

### 🤖 AI & OCR Features
- OCR-based photo scanning for expense entry  
- Reduced manual data entry time by **60%**  
- AI-generated saving opportunities  
- Smart financial tips  
- Overspending alerts  

### 📊 Data Visualization
- Interactive charts using **Recharts**  
- Category-wise expense breakdown  
- Income vs Expense comparison  

---

## 🧩 UI Components
- Reusable modal components  
- Custom form inputs  
- Responsive UI with **Tailwind CSS**  
- Optimized for mobile & desktop  

---

## 🖥️ Tech Stack

### Frontend
- React  
- Vite  
- Tailwind CSS  
- Recharts  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Multer (File Uploads)  
- JWT Authentication  

---

## 🧠 Core Backend Features
- RESTful API endpoints  
- JWT authentication middleware  
- Profile photo upload system  
- MongoDB data models:
  - User (Encrypted passwords)  
  - Income  
  - Expense  
- Full CRUD operations  
- Dashboard data aggregation for insights  

---

## 📊 Charts & Visualization
- Income and expense trend lines
- Category-based breakdowns
- Interactive visual feedback for budgeting

---

## 📁 File Export Support
- Downloadable income and expense reports in Excel format

---

## Screenshots

<img width="1920" height="1080" alt="Screenshot 2025-12-18 232106" src="https://github.com/user-attachments/assets/1d2903ad-38fb-4c74-ad6e-4eac263916a6" />

<img width="1920" height="1080" alt="Screenshot 2025-12-18 232114" src="https://github.com/user-attachments/assets/9ae10937-2eb7-4331-b245-85a4cbeacbea" />

<img width="1920" height="1080" alt="Screenshot 2025-12-18 232240" src="https://github.com/user-attachments/assets/762f5a1f-43e6-4bd5-960b-429db16954e5" />

<img width="1920" height="1080" alt="Screenshot 2025-12-18 232254" src="https://github.com/user-attachments/assets/8e7c4c5b-e13b-4095-96d6-51455ddb3834" />

<img width="1920" height="1080" alt="Screenshot 2025-12-18 232305" src="https://github.com/user-attachments/assets/33f5d66e-5073-4843-9405-9fe81e060aad" />

<img width="1920" height="1080" alt="Screenshot 2025-12-18 232318" src="https://github.com/user-attachments/assets/6d24908a-539d-453c-8135-cb1b55171910" />

<img width="1920" height="1080" alt="Screenshot 2025-12-18 232333" src="https://github.com/user-attachments/assets/0214a6fe-1687-4a8c-89cc-04cb4dafdaf4" />

<img width="1920" height="1080" alt="Screenshot 2025-12-18 232342" src="https://github.com/user-attachments/assets/533b203c-3eff-4feb-9bed-79e1a36a1025" />

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/finance-flow.git
cd finance-flow
```

### 2. Install Frontend Dependencies
```bash
cd client
npm install
npm run dev
```

### 3. Install Backend Dependencies
```bash
cd ../server
npm install
npm start
```

### 4. Configure Environment Variables

- Inside the /server directory, create a .env file and add:
- MONGO_URI=your_mongo_connection_string
- JWT_SECRET=your_jwt_secret_key





