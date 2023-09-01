import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import Provider from "@/components/Provider"
import { Suspense } from "react"
import Loading from "./loading"
import sytles from '@/styles/styles.css'

export const metadata = {
	title: 'Link Save',
	description: 'Save your link here',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Provider>
				<div>
					<Nav/>
					<Suspense fallback={<Loading/>}>
						{children}
					</Suspense>
				</div>
				<Footer/>
				</Provider>
			</body>
		</html>
	)
}
