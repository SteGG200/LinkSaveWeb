'use client'

import Button from "@/components/Button"
import ErrorMsg from "@/components/ErrorMsg"
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
	const [loadingRes, setLoadingRes] = useState(false);

	const onSubmit = async(data) =>{
		setLoadingRes(true);
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
		setLoadingRes(false);

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
		<div className="w-full py-8">
			<Form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-2">
				<p className="text-2xl sm:text-3xl robocon">Sign up</p>
				</div>
				<div className="pt-2 space-y-4">
					<div>
						<Input
							label="Username"
							type="text"
							placeholder="Enter your username"
							{...register("username",{
								required: "Please enter your username",
								pattern: {
									value: /^[a-zA-Z\w]+$/gm,
									message: "Invalid username!"
								}
							})}
							disabled={isLoading || loadingRes}
							invalid={errors.username ? "true" : "false"}
						/>
						{errors.username &&
							<ErrorMsg>{errors.username.message}</ErrorMsg>
						}
					</div>
					<div>
						<Input
							label="Password"
							type="password"
							placeholder="Enter your password"
							{...register("password",{
								required: "Please enter your password",
								pattern: {
									value: /^[\S]+$/gm,
									message: "Invalid password!"
								}
							})}
							disabled={isLoading || loadingRes}
							invalid={errors.password ? "true" : "false"}
						/>
						{errors.password &&
							<ErrorMsg>{errors.password.message}</ErrorMsg>
						}
					</div>
					<div>
						<Input
							label="Comfirm password"
							type="password"
							placeholder="Comfirm your password"
							{...register("comfirm_password",{
								validate: value => value === watch("password") || "Passwords do not match"
							})}
							disabled={isLoading || loadingRes}
							invalid={(errors.comfirm_password && !errors.password) ? "true" : "false"}
						/>
						{(errors.comfirm_password && !errors.password) &&
							<ErrorMsg>{errors.comfirm_password.message}</ErrorMsg>
						}
						{
							(errDb && isValid) &&
							<ErrorMsg>{errDb}</ErrorMsg>
						}
					</div>
					<Button type="submit" disabled={isLoading || loadingRes}>Register</Button>
				</div>
			</Form>
		</div>
	)
}