import connectDB from "@/lib/connectDB";
import HomePageBanner from "@/model/homepagebanner";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req){
    try {
        const homePageBanner = await HomePageBanner.find().sort({ date: -1 });
        return NextResponse.json({"result":homePageBanner})
    } catch (error) {
        return NextResponse.json({
            "msg":error.message
        }, {status:400})
    }
}
