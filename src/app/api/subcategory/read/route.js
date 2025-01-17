import connectDB from "@/lib/connectDB";
import SubCategory from "@/model/subCategory";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req){
    try {
        const subCategory = await SubCategory.find().sort({ date: -1 });
        return NextResponse.json({"result":subCategory})
    } catch (error) {
        return NextResponse.json({
            "msg":error.message
        }, {status:400})
    }
}
