import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label className='text-[13px] font-medium block mb-2' style={{ color: 'var(--text-muted)' }}>{label}</label>
      
      <div className="relative group">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="input-premium"
          value={value}
          onChange={onChange}
        />
        
        {type === "password" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors hover:text-white" style={{ color: 'var(--text-muted)' }} onClick={toggleShowPassword}>
            {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
          </div>
        )}
      </div>
    </div>
  )
}

export default Input
