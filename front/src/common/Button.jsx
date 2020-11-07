        
function Button (props) {
  return (
    <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
      onClick={props.onClick} 
    >
      {props.children}
    </button>
  )
}
        
export default Button;