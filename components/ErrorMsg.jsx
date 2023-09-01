export default function ErrorMsg(props){
	return(
		<span 
			className="text-red-400"
			{...props}
		>{props.children}</span>
	)
}