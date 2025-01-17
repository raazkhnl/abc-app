import connectDB from "@/lib/connectDB";
import Documentation from "@/model/documentation";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req){
    try {
        const document = await Documentation.find().sort({ date: -1 });
        return NextResponse.json({"result":document})
    } catch (error) {
        return NextResponse.json({
            "msg":error.message
        }, {status:400})
    }
}
