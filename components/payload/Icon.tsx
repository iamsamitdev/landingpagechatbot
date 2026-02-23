import React from 'react'

export const Icon = () => {
  return (
    <div className="icon-wrapper">
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="8" fill="#3B82F6" />
        <path 
          d="M12 20L18 26L28 14" 
          stroke="white" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default Icon
