'use client'

import { useSession } from "next-auth/react"
import Link from "next/link";

export default function App(){
  const {data: session, status} = useSession();

  return(
    <div className="w-full py-8 sm:mb-10">
      <p className="font-mono text-green-600 text-4xl sm:text-5xl text-center px-2">Welcome to Link Save</p>
      {
        status !== 'loading' &&
        <p className="text-2xl sm:text-3xl robocon text-center mt-4 text-slate-500">
          Click&nbsp;
          {
            status === 'authenticated' ?
            <>
              <Link
                href={`/${session.user.name}`}
                className="underline underline-offset-2 hover:text-green-600"
              >
                Here
              </Link>
              &nbsp;to see your profile
            </>
            :
            <>
              <Link
                href="/login"
                className="underline underline-offset-2 hover:text-green-600"
              >
                Here
              </Link>
              &nbsp;to log in
            </>
          }
        </p>
      }
    </div>
  )
}