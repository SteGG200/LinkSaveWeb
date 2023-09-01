import { database } from "@/database/database";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
	try{
		let query = "SELECT * FROM user_profile WHERE name = ?"
		const [rows, fields] = await database.execute(query, [params.username]);
		const profile = rows.find(user => user.name === params.username);
		if(!profile){
			const newdata = {
				links : []
			}
			await database.execute("INSERT INTO `user_profile` (`name`, `link`) VALUES (?, ?)", [params.username, newdata])
			return NextResponse.json(newdata)
		}
		const data = profile.link
	
		return NextResponse.json(data)
	}catch(error){
		return NextResponse.json({error : error.message})
	}
}

export async function POST(req, {params}){
	try{
		const data = await req.json();
		const name = params.username;
		let query = "SELECT * FROM user_profile WHERE name = ?"
		const [rows, fields] = await database.execute(query, [name])
		const profile = rows.find(user => user.name === name);
		if(!profile){
			throw new Error("Cannot find user name profile")
		}

		let isexist = false;

		for(let i = 0; i < profile.link.links.length; i++){
			if(profile.link.links[i].url === data.url){
				isexist = true;
				break;
			}
		}

		if(isexist){
			throw new Error("1062")
		}

		const newprofile = {
			links: [
				...profile.link.links,
				data
			]
		}

		// console.log(newprofile);

		query = "UPDATE user_profile SET link = ? WHERE name = ?"
		await database.execute(query, [newprofile, name])
		return NextResponse.json({ok: true})
	}catch(error){
		return NextResponse.json({error : error.message});
	}
}

export async function DELETE(req, {params}){
	try{
		const data = await req.json();
		const name = params.username
		let query = "SELECT * FROM user_profile WHERE name = ?"
		const [rows, fields] = await database.execute(query, [name])
		const profile = rows.find(user => user.name === name);
		if(!profile){
			throw new Error("Cannot find user name profile")
		}

		const index = data.id;
		if(JSON.stringify(profile.link.links[index]) !== JSON.stringify(data)){
			throw new Error("404");
		}

		const newprofile = profile.link;
		// console.log(newprofile.links);
		newprofile.links.splice(index, 1);
		// console.log(newprofile.links);

		for(let i = 0; i < newprofile.links.length; i++){
			newprofile.links[i].id = i;
		}

		query = "UPDATE user_profile SET link = ? WHERE name = ?"
		await database.execute(query, [newprofile, name])
		return NextResponse.json({ok: true})
	}catch(error){
		return NextResponse.json({error : error.message});
	}
}