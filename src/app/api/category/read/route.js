import connectDB from "@/lib/connectDB";
import Category from "@/model/category";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req){
    try {
        const category = await Category.find().sort({ date: -1 });
        return NextResponse.json({"result":category})
    } catch (error) {
        return NextResponse.json({
            "msg":error.message
        }, {status:400})
    }
}
