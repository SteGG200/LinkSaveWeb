'use client'

import Form from "@/components/Form";
import { Input } from "@/components/Input";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const errorAuthen = {
	"401": "Cannot find that username",
	"402": "Username or Password is incorrect"
}

export default function Login(){
	const {
		register,
		handleSubmit,
		setValue,
		setFocus,
		formState: {
			errors,
			isLoading
		}
	} = useForm();

	const router = useRouter();
	const {data: session, status} = useSession();
	const [authError, setAuthError] = useState(null);

	const onSubmit = async (data) => {
		const status = await signIn('credentials',{
			redirect: false,
			username: data.username,
			password: data.password,
			callbackUrl: '/'
		});
		if(!status.error){
			router.push(status.url);
			setAuthError(null);
		}else{
			setValue("password","");
			setFocus("username");
			if(errorAuthen[status.error]){
				setAuthError(errorAuthen[status.error])
			}else{
				setAuthError(status.error)
			}
		}
	}

	useEffect(() => {
		if(status === "authenticated"){
			router.push('/')
		}
	})

	return(
		<div>
			{
				status==="unauthenticated" &&
				<Form onSubmit={handleSubmit(onSubmit)}>
					<label>Username</label>
					<Input 
						type="text"
						{...register("username", {
							required : "Please enter your username",
							pattern: {
								value: /^[a-zA-Z\w]+$/gm,
								message: "Invalid username!"
							}
						})}
						disabled={status==="loading" || isLoading}
					/>
					{errors.username && 
						<span>{errors.username.message}</span>
					}
					<label>Password</label>
					<Input 
						type="password" 
						{...register("password", {
							required : "Please enter your password",
							pattern: /^[a-zA-Z_\d\W]+$/gm
						})}
						disabled={status==="loading" || isLoading}
					/>
					{errors.password &&
						<span>{errors.password.message}</span>
					}
					{(authError && !errors.password && !errors.username) && 
						<span>{authError}</span>
					}
					<button type="submit" disabled={status==="loading" || isLoading}>Submit</button>
				</Form>
			}
		</div>
	)
}