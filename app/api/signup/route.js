import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { database } from "@/database/database";

export async function POST(request){
	const data = await request.json();
	const username = data.username;
	const password = data.password;
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)
	const id = new Date().getTime();
	try{
		let query = "INSERT INTO `user_information` (`id`, `username`, `password`) VALUES (?, ?, ?);"
		await database.execute(query, [id, username, hashedPassword]);

		// database.end();

		return NextResponse.json({ok: true})
	}catch(error){
		return NextResponse.json({error});
	}
}