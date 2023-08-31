'use client'

import Form from "@/components/Form"
import { Input } from "@/components/Input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function Signup(){
	const {
		register,
		handleSubmit,
		watch,
		formState:{
			isLoading,
			errors,
			isValid
		}
	} = useForm()

	const [errDb, setErrDb] = useState(null);
	const router = useRouter();

	const onSubmit = async(data) =>{
		const response = await fetch("/api/signup",{
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				username: data.username,
				password: data.password
			})
		})

		const result = await response.json();

		if(result.ok){
			setErrDb(null);
			router.push('/login');
		}else{
			if(result.error.errno == 1062){
				setErrDb("The username has already been taken")
			}else{
				setErrDb(result.error.message)
			}
		}
	}

	return(
		<div>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Input
					label="Username"
					type="text"
					{...register("username",{
						required: "Please enter your username",
						pattern: {
							value: /^[a-zA-Z\w]+$/gm,
							message: "Invalid username!"
						}
					})}
					disabled={isLoading}
				/>
				{errors.username &&
					<span>{errors.username.message}</span>
				}
				<Input
					label="Password"
					type="password"
					{...register("password",{
						required: "Please enter your password",
						pattern: {
							value: /^[\S]+$/gm,
							message: "Invalid password!"
						}
					})}
					disabled={isLoading}
				/>
				{errors.password &&
					<span>{errors.password.message}</span>
				}
				<Input
					label="Comfirm password"
					type="password"
					{...register("comfirm_password",{
						validate: value => value === watch("password") || "Passwords do not match"
					})}
					disabled={isLoading}
				/>
				{(errors.comfirm_password && !errors.password) &&
					<span>{errors.comfirm_password.message}</span>
				}
				{
					(errDb && isValid) &&
					<span>{errDb}</span>
				}
				<button type="submit" disabled={isLoading}>Register</button>
			</Form>
		</div>
	)
}