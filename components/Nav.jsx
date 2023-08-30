'use client'

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Nav(){
	const {data: session, status} = useSession();
	return(
		<nav>
			<Link href="/">
				<Image
					src="/assets/icon/favicon.ico"
					alt="LOL"
					width={30}
					height={30}
				/>
			</Link>
			{
				status==="authenticated" &&
				<>
					<Link
						href={`/${session.user.name}`}
					>
						{session.user.name}
					</Link>
					<button
						onClick={signOut}
					>
						Sign out
					</button>
				</>
			}
			{
				status==="unauthenticated" &&
				<>
					<Link
						href="/login"
					>
						Log in
					</Link>
					<Link
						href="/signup"
					>
						Sign up
					</Link>
				</>
			}
		</nav>
	)
}