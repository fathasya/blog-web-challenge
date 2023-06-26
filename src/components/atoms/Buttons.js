const Buttons = ({ onClick ,icon, text}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className='flex items-center justify-center gap-2 items-center px-3 md:px-4 py-2 bg-gray-100 rounded-lg text-gray-900'
    >
      {icon}
      {text}
    </button>
  )
}

export default Buttons