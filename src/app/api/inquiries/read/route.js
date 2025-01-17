import connectDB from "@/lib/connectDB";
import Inquiries from "@/model/inquiries";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req){
    try {
        const inquiry = await Inquiries.find().sort({ date: -1 });
        return NextResponse.json({"result":inquiry})
    } catch (error) {
        return NextResponse.json({
            "msg":error.message
        }, {status:400})
    }
}
