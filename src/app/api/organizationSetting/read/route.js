import connectDB from "@/lib/connectDB";
import Org from "@/model/organizationSetting";
import { NextResponse } from "next/server";


connectDB();

export async function GET(req){
    try {
        const orgDetail = await Org.find().sort({ date: -1 });
        return NextResponse.json({"result":orgDetail})
    } catch (error) {
        return NextResponse.json({
            "msg":error.message
        }, {status:400})
    }
}
