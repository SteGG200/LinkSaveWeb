import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import Provider from "@/components/Provider"
import { Suspense } from "react"
import Loading from "./loading"

export const metadata = {
  title: 'Link Incognito',
  description: 'Save your link here',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Nav/>
          <Suspense fallback={<Loading/>}>
            {children}
          </Suspense>
          <Footer/>
        </Provider>
      </body>
    </html>
  )
}
