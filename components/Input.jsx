import { forwardRef } from "react"

const Input = forwardRef((props, ref) => {
	return (
		<div>
			{
				!props.nolabel &&
				<div className="mb-2">
					<label>{props.label || props.name}</label>
				</div>
			}
			<div className="w-full mb-2">
				<input
					{...props}
					className={`invalid:border-red-400 disabled:text-slate-500 disabled:bg-slate-50 w-full h-[50px] pl-4 border-2 rounded-md outline-0 ${
						props.invalid === "true" ? 
						"border-red-400":
						"border-[##e5e7eb]"
					}`}
				 	placeholder={props.placeholder || props.name} 
					ref={ref}
				/>
			</div>
		</div>
	)
})

Input.displayName = 'Input'

export default Input;