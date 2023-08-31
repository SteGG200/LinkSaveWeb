'use client'

import Form from "@/components/Form";
import { Input } from "@/components/Input";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function isAuthenticatedByUser(session, username){
	return session.user.name === username;
}

function WarningAlert({message, callback}) {
	return(
		<div>
			<span>{message}</span>
			<button onClick={() => {
				sessionStorage.setItem('warning', 0);
				callback(sessionStorage.getItem('warning') === '1');
			}}>
				x
			</button>
		</div>
	)
}

export default function Profile({params}) {
	const {data: session, status} = useSession();
	const router = useRouter();
	const [warning, setWarning] = useState(false);
	const [profileLink, setProfileLink] = useState(null)
	const [errdb, setErrdb] = useState(null)
	const{
		register,
		handleSubmit,
		setValue,
		formState:{
			isLoading,
			errors
		}
	} = useForm();
	
	useEffect(() => {
		if(status === "unauthenticated"){
			router.push('/login')
		}else if(status === "authenticated"){
			const result = isAuthenticatedByUser(session, params.username);
	
			if(!result){
				router.push(`/${session.user.name}`)
				sessionStorage.setItem('warning', 1);
			}
			setWarning(sessionStorage.getItem('warning') === '1');
		}
	})

	useEffect(() => {
		if(status === "authenticated"){
			(async () => {
				try{
					const response = await fetch(`/api/${session.user.name}`);
					const result = await response.json();
					setProfileLink(result);
				}catch(e){
					throw e
				}
			})()
		}
	})

	const onSubmit = async(data) => {
		if(!data.title){
			data.title = data.url
		}
		const status = await fetch(`/api/${session.user.name}`,{
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(data)
		});

		const result = await status.json();

		if(result.ok){
			setErrdb(null);
			setValue("url");
			setValue("title")
		}else{
			if(result.error === "1062"){
				setErrdb('You have already added this link!')
			}else{
				setErrdb(result.error)
			}
		}
	}

	return(
		<div>
			{
				(status === "authenticated" && isAuthenticatedByUser(session, params.username)) && 
				<div>
					{
						warning &&
						<WarningAlert
							message="You are not allow to see other's profile!"
							callback={setWarning}
						/>
					}
					<h1>Profile of {params.username}</h1>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Input
							nolabel="true"
							placeholder="Enter the link"
							type="url"
							{...register("url",{
								required: "Please enter the link!"
							})}
							disabled={isLoading}
						/>
						{
							errors.url &&
							<span>{errors.url.message}</span>
						}
						<Input
							nolabel="true"
							placeholder="Enter link's title"
							type="text"
							{...register("title")}
							disabled={isLoading}
						/>
						<button type="submit" disabled={isLoading}>Submit</button>
					</Form>
					<ol>
						{
							!profileLink ?
							<div>
								<span>Loading Your Profile...</span>
							</div>
							:
							<div>
								{
									profileLink.links.map(link => {
										return(
											<li>
												<a
													href={link.url}
												>
													{link.title}
												</a>
											</li>
										)
									})
								}
							</div>
						}
					</ol>
				</div>
			}
		</div>
	)
}