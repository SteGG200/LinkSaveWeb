import { forwardRef } from "react"

export const Input = forwardRef((props, ref) => {
	return (
		<>
			{
				!props.nolabel &&
				<label>{props.label || props.name}</label>
			}
			<input placeholder={props.placeholder || props.name} {...props} ref={ref}/>
		</>
	)
})