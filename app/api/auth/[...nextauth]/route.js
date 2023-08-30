import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'

let database = [
	{
		id: new Date().toString(),
		username: 'SteGG',
		password: bcrypt.hashSync('123', 10)
	}
]

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Account',
			async authorize(credentials, req){
				const username = credentials.username;
				const password = credentials.password;
				const user = database.find(user => user.username === username);
				if(!user){
					throw new Error(401); //Cannot find that username
				}

				if(!bcrypt.compareSync(password, user.password)){
					throw new Error(402); //Username or Password is incorrect
				}

				return {
					id: user.id,
					name: user.username,
					password: user.password
				}
			}
		})
	],
	callbacks: {
		async session({session, token, user}){
			return session;
		}
	}
})

export {handler as GET, handler as POST}