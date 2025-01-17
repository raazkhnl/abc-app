import connectDB from "@/lib/connectDB";
import Event from "@/model/event";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req){
    try {
        const event = await Event.find().sort({ date: -1 });
        return NextResponse.json({"result":event})
    } catch (error) {
        return NextResponse.json({
            "msg":error.message
        }, {status:400})
    }
}
