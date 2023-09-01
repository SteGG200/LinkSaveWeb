'use client'

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Nav(){
	const {data: session, status} = useSession();
	return(
		<nav className="border-b-2">
			<div className="flex px-4 mx-auto xl:w-[1170px] lg:w-[970px] md:w-[750px] sm:w-[600px] justify-between mt-2 pb-2">
				<Link href="/">
					<Image
						src="/assets/image/L.png"
						alt="LOL"
						width={40}
						height={40}
					/>
				</Link>
				{
					status==="authenticated" &&
					<div>
						<Link
							href={`/${session.user.name}`}
							className="sm:text-base text-sm underline underline-offset-1 hover:text-green-600"
						>
							{session.user.name}
						</Link>
						<span className="sm:text-base text-sm mx-2">/</span>
						<button
							onClick={signOut}
							className="sm:text-base text-sm hover:text-green-600"
						>
							Sign out
						</button>
					</div>
				}
				{
					status==="unauthenticated" &&
					<div>
						<Link
							href="/login"
							className="sm:text-base text-sm hover:text-green-600"
						>
							Log in
						</Link>
						<span className="sm:text-base text-sm mx-2">/</span>
						<Link
							href="/signup"
							className="sm:text-base text-sm hover:text-green-600"
						>
							Sign up
						</Link>
					</div>
				}
			</div>
		</nav>
	)
}