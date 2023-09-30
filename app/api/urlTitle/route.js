import { NextResponse } from "next/server";

function getTitle(body){
	const pattern = /<title(.*|\.)>(.*|\.)<\/title>/gm
	const titleTag = pattern.exec(body);
	if(!titleTag || typeof titleTag[2] !== "string"){
		return null;
	}
	return titleTag[2];
}

export async function GET(req){
	try{
		const {searchParams} = new URL(req.url);
		const url = searchParams.get('url')
		const response = await fetch(url);
		const body = await response.text();
		const title = getTitle(body);
		return NextResponse.json({title});
	}catch(e){
		return NextResponse.json({error: e.message});
	}

}

export const dynamic = 'force-dynamic'