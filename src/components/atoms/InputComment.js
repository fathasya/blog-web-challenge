import React from 'react'

const InputComment = ({value, onChange}) => {
  return (
    <textarea
      rows='5'
      className='w-full bg-gray-50 rounded-lg border-2 p-3 text-xs md:text-sm text-gray-900'
      placeholder='Tulis Komentar...'
      value={value}
      onChange={onChange}
    />
  )
}

export default InputComment