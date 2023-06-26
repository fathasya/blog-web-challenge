const ButtonSubmit = ({ onClick, text}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className='bg-blue-500 px-3 py-2 text-xs md:text-sm lg:text-md rounded-lg text-white hover:bg-blue-600'
    >
      {text}
    </button>
  )
}

export default ButtonSubmit