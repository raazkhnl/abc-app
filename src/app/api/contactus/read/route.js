import connectDB from "@/lib/connectDB";
import ContactUs from "@/model/contactUs";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req){
    try {
        const contact = await ContactUs.find().sort({ date: -1 });
        return NextResponse.json({"result":contact})
    } catch (error) {
        return NextResponse.json({
            "msg":error.message
        }, {status:400})
    }
}
