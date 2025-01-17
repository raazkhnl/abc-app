import connectDB from "@/lib/connectDB";
import About from "@/model/about";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req){
    try {
        const about = await About.find().sort({ date: -1 });
        return NextResponse.json({"result":about})
    } catch (error) {
        return NextResponse.json({
            "msg":error.message
        }, {status:400})
    }
}
