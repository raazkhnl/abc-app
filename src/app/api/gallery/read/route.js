import connectDB from "@/lib/connectDB";
import Gallery from "@/model/gallery";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req){
    try {
        const gallery = await Gallery.find().sort({ date: -1 });
        return NextResponse.json({"result":gallery})
    } catch (error) {
        return NextResponse.json({
            "msg":error.message
        }, {status:400})
    }
}
