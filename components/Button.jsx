export default function Button(props){
	return(
		<button
			className="disabled:bg-green-400 bg-green-500 hover:bg-green-400 text-slate-50 h-[50px] w-full rounded-md"
			{...props}
		>
			{props.children}
		</button>
	)
}