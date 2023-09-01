'use client'

import ErrorMsg from "@/components/ErrorMsg";
import Button from "@/components/Button";
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
	const [loadingRes, setLoadingRes] = useState(false);

	const onSubmit = async (data) => {
		setLoadingRes(true);
		const status = await signIn('credentials',{
			redirect: false,
			username: data.username,
			password: data.password,
			callbackUrl: '/'
		});
		setLoadingRes(false);
		if(!status.error){
			setAuthError(null);
			router.push(status.url);
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
		<div className="w-full py-8">
			{
				status==="unauthenticated" &&
				<Form 
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="mb-2">
						<p className="text-2xl sm:text-3xl robocon">Log In</p>
					</div>
					<div className="pt-2 space-y-4">
						{/* <label>Username</label> */}
						<div>
							<Input
								label="Username" 
								type="text"
								placeholder="Enter your username"
								{...register("username", {
									required : "Please enter your username",
									pattern: {
										value: /^[a-zA-Z\w]+$/gm,
										message: "Invalid username!"
									}
								})}
								disabled={isLoading || status === "loading" || loadingRes}
								invalid={errors.username ? "true" : "false"}
							/>
							{errors.username && 
								<ErrorMsg>{errors.username.message}</ErrorMsg>
							}
						</div>

						{/* <label>Password</label> */}
						<div>
							<Input
								label="Password"
								type="password" 
								placeholder="Enter your password"
								{...register("password", {
									required : "Please enter your password",
									pattern: {
										value: /^[\S]+$/gm,
										message: "Invalid password!"
									}
								})}
								disabled={isLoading || status === "loading" || loadingRes}
								invalid={errors.password ? "true" : "false"}
							/>
							{errors.password &&
								<ErrorMsg>{errors.password.message}</ErrorMsg>
							}
							{(authError && !errors.password && !errors.username) && 
								<ErrorMsg>{authError}</ErrorMsg>
							}
						</div>
						<div>
							<Button type="submit" disabled={isLoading || status === "loading" || loadingRes}>
								Log in
							</Button>
						</div>
					</div>
				</Form>
			}
		</div>
	)
}