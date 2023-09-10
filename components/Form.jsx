export default function Form(props){
	return(
		<div className="flex justify-center mx-auto xl:w-[1170px] lg:w-[970px] px-4">
			<form 
				className="flex flex-col divide-y-2 p-6 w-1/2 max-lg:w-2/3 max-md:w-4/5 border-2 border-slate-400 border rounded-md"
				autoComplete="off"
				{...props}
			>
				{props.children}
			</form>
		</div>
	)
}