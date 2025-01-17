import connectDB from "@/lib/connectDB";
import TestPreparation from "@/model/testPreparation";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req){
    try {
        const testPreparation = await TestPreparation.find().sort({ date: -1 });
        return NextResponse.json({"result":testPreparation})
    } catch (error) {
        return NextResponse.json({
            "msg":error.message
        }, {status:400})
    }
}
