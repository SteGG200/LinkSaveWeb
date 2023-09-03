'use client'

import ErrorMsg from "@/components/ErrorMsg";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import WarningAlert from "@/components/WarningAlert";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import LinkItem from "@/components/LinkItem";

function isAuthenticatedByUser(session, username) {
	return session.user.name === username;
}

export default function Profile({ params }) {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [warning, setWarning] = useState(false);
	const [profileLink, setProfileLink] = useState(null)
	const [errdb, setErrdb] = useState(null)
	const [loadingRes, setLoadingRes] = useState(false);
	const {
		register,
		handleSubmit,
		setValue,
		formState: {
			isLoading,
			errors
		}
	} = useForm();

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push('/login')
		} else if (status === "authenticated") {
			const result = isAuthenticatedByUser(session, params.username);

			if (!result) {
				router.push(`/${session.user.name}`)
				sessionStorage.setItem('warning', 1);
			}
			setWarning(sessionStorage.getItem('warning') === '1');
		}
	}, [status, params.username, router, session]);

	useEffect(() => {
		if (status === "authenticated") {
			(async () => {
				try {
					const response = await fetch(`/api/${session.user.name}`);
					const result = await response.json();
					setProfileLink(result);
				} catch (e) {
					throw e
				}
			})()
		}
	},[status])

	const insertLink = async (data) => {
		setLoadingRes(true);
		if (!data.title) {
			data.title = data.url
		}
		data.id = profileLink.links.length;
		const status = await fetch(`/api/${session.user.name}`, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(data)
		});

		const result = await status.json();

		setLoadingRes(false);

		if (result.ok) {
			setErrdb(null);
			setValue("url");
			setValue("title");
			const response = await fetch(`/api/${session.user.name}`);
			const result = await response.json();
			setProfileLink(result);
		} else {
			if (result.error === "1062") {
				setErrdb('You have already added this link!')
			} else {
				setErrdb(result.error)
			}
		}
	}

	const deleteLink = async (id) => {
		setLoadingRes(true);
		const status = await fetch(`/api/${session.user.name}`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(profileLink.links[id])
		})

		const result = await status.json();

		console.log(result);

		if (!result.ok) {
			if (result.error === "404") {
				alert("Cannot find your link!")
			} else {
				alert(result.error);
			}
		}else{
			const response = await fetch(`/api/${session.user.name}`);
			const result = await response.json();
			setProfileLink(result);
		}

		setLoadingRes(false);
	}

	return (
		<div className="w-full py-20">
			{
				(status === "authenticated" && isAuthenticatedByUser(session, params.username)) &&
				<div className="space-y-8">
					{
						warning &&
						<WarningAlert
							message="You are not allow to see other's profile!"
							callback={setWarning}
						/>
					}
					<p className="font-mono text-3xl sm:text-4xl text-center">Profile of <span className="font-bold text-green-600">{params.username}</span></p>
					<Form
						className="flex flex-col p-6 w-1/2 max-lg:w-2/3 max-md:w-4/5 border-2 border-slate-400 border rounded-md"
						onSubmit={handleSubmit(insertLink)}>
						<div className="mb-2">
							<p className="text-2xl sm:text-3xl robocon">Add new link</p>
						</div>
						<div className="pt-2 space-y-4">
							<Input
								nolabel="true"
								placeholder="Enter the link"
								type="url"
								{...register("url", {
									required: "Please enter the link!"
								})}
								disabled={isLoading || loadingRes}
							/>
							{
								errors.url &&
								<ErrorMsg>{errors.url.message}</ErrorMsg>
							}
							<Input
								nolabel="true"
								placeholder="Enter link's title"
								type="text"
								{...register("title")}
								disabled={isLoading || loadingRes}
							/>
							{
								(errdb && !errors.url) &&
								<ErrorMsg>{errdb}</ErrorMsg>
							}
							<Button type="submit" disabled={isLoading || loadingRes}>Insert link</Button>
						</div>
					</Form>
					<ol className="w-full">
						{
							!profileLink ?
								<div>
									<p className="text-center text-xl">Loading Your Profile...</p>
								</div>
								:
								<div className="space-y-2 shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-md p-4 w-11/12 sm:w-5/6 lg:w-2/3 mx-auto">
									{
										profileLink.links.length > 0 ?
											profileLink.links.map(link =>	<LinkItem link={link} deleteLink={deleteLink} key={link.id}/>)
											:
											<p className="text-center text-xl">You haven&apos;t saved any links yet</p>
									}
								</div>
						}
					</ol>
				</div>
			}
		</div>
	)
}