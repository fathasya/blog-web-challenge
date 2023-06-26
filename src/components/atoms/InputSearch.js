const InputSearch = ({ placeholder , ...props}) => {
  return (
    <div className='flex w-full md:w-1/3 items-center px-2 md:px-3 py-1 md:py-2 bg-gray-50 rounded-full lg:rounded-lg md:space-x-4'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-5 h-5 md:w-6 md:h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
      <input 
        type='text' 
        placeholder={placeholder} 
        className='bg-gray-50 px-2 outline-none text-xs md:text-sm text-gray-800 w-full'
        {...props}
      />
    </div> 
  )
}

export default InputSearch