import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import { database } from "@/database/database";

// let database = [
// 	{
// 		id: new Date().toString(),
// 		username: 'SteGG',
// 		password: bcrypt.hashSync('123', 10)
// 	}
// ]

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Account',
			async authorize(credentials, req){
				const username = credentials.username;
				const password = credentials.password;

				try{
					let query = "SELECT * FROM user_information WHERE `username` = ?"
					const [rows, fields] = await database.execute(query, [username])
					const user = rows.find(user => user.username === username);
					if(!user){
						throw new Error(401); //Cannot find that username
					}
					
					if(!(await bcrypt.compare(password, user.password)) && !(password === user.password)){
						throw new Error(402); //Username or Password is incorrect
					}
	
					return {
						id: user.id,
						name: user.username
					}
				}catch(e){
					throw e;
				}
			}
		})
	],
	callbacks: {
		async session({session, token, user}){
			return session;
		}
	},
	session:{
		strategy: "jwt",
		maxAge: 24 * 60 * 60
	}
})

export {handler as GET, handler as POST}