import connectDB from "@/lib/connectDB";
import StudyAbroad from "@/model/studyAbroad";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req){
    try {
        const studyAbroad = await StudyAbroad.find().sort({ date: -1 });
        return NextResponse.json({"result":studyAbroad})
    } catch (error) {
        return NextResponse.json({
            "msg":error.message
        }, {status:400})
    }
}
