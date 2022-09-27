import React from 'react'

const PasswordIcon: React.FC<{width: number, height: number}> = (props) => {
  return (
    <svg
    width={props.width}
    height={props.height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.5 6.563c-7.292 0-13.519 4.535-16.042 10.937 2.523 6.402 8.75 10.938 16.042 10.938 7.292 0 13.519-4.536 16.042-10.938-2.523-6.402-8.75-10.938-16.042-10.938Zm0 18.229a7.294 7.294 0 0 1-7.292-7.292 7.294 7.294 0 0 1 7.292-7.292 7.294 7.294 0 0 1 7.292 7.292 7.294 7.294 0 0 1-7.292 7.292Zm0-11.667a4.37 4.37 0 0 0-4.375 4.375 4.37 4.37 0 0 0 4.375 4.375 4.37 4.37 0 0 0 4.375-4.375 4.37 4.37 0 0 0-4.375-4.375Z"
      fill="#535353"
      fillOpacity={0.87}
    />
  </svg>
  )
}

export default PasswordIcon