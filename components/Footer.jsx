import Image from "next/image";

export default function Footer(){
	return(
		<footer className="bg-[#222222] sm:border-t-4 sm:border-green-600">
			<div className="flex flex-wrap sm:flex-row flex-col p-4 justify-between mx-auto xl:w-[1170px] lg:w-[970px] md:w-[750px] sm:w-[600px]">
				{/* Copyright */}
				<p className="text-[#ccc] text-center max-sm:pb-2 max-sm:border-b-2 max-sm:border-[#ccc]">©2023 Author: Steven George</p>
				{/* Info */}
				<div className="flex flex-wrap space-x-3 justify-center max-sm:pr-4 max-sm:mt-2">
					<a
						href="https://www.facebook.com/geor.steven/"
					>
						<Image
							src="/assets/icon/facebook.svg"
							alt="Facebook icon"
							priority
							height={24}
							width={24}
						/>
					</a>
					<a
						href="https://github.com/SteGG200"
					>
						<Image
							src="/assets/icon/github.svg"
							alt="Github icon"
							priority
							height={25}
							width={25}
						/>
					</a>
					<a>
						<Image
							src="/assets/icon/discord.svg"
							alt="Discord icon"
							priority
							height={25}
							width={25}
						/>
					</a>
					<a
						href="mailto:binhbhgl5@gmail.com"
					>
						<Image
							src="/assets/icon/google.svg"
							alt="Google icon"
							priority
							height={25}
							width={25}
						/>
					</a>
				</div>
			</div>
		</footer>
	)
}