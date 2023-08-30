'use client'

import Form from "@/components/Form";
import getTitleAtUrl from "get-title-at-url";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function isAuthenticatedByUser(session, username){
	return session.user.name === username;
}

function WarningAlert({message, callback}) {
	return(
		<div>
			<span>{message}</span>
			<button onClick={() => {
				sessionStorage.setItem('warning', 0);
				callback(sessionStorage.getItem('warning'));
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
	const [url, setUrl] = useState('');
	const [title, setTitle] = useState('');
	
	useEffect(() => {
		if(status === "unauthenticated"){
			router.push('/')
		}else if(status === "authenticated"){
			const result = isAuthenticatedByUser(session, params.username);
	
			if(!result){
				router.push(`/${session.user.name}`)
				sessionStorage.setItem('warning', 1);
			}
			setWarning(sessionStorage.getItem('warning') === '1')
		}
	})

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
					<Form
						onSubmit={async (e) => {
							e.preventDefault();
							const {title} = await getTitleAtUrl(url);
							setTitle(title);
						}}
					>
						<input
							type="url"
							onChange={(e) => setUrl(e.target.value)}
						/>
						<button>
							Insert Link
						</button>
					</Form>
					{title}
				</div>
			}
		</div>
	)
}