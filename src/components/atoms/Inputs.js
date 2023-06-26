import React from 'react'

const Inputs = ({type, name, value, placeholder, onChange, ...props}) => {
  return (
    <input 
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      {...props}
      className='w-full bg-gray-50 p-3 rounded-lg my-2 text-xs md:text-sm text-gray-900'
    />
  )
}

export default Inputs