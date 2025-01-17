import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import Testimonial from "@/model/Testimonials";

connectDB();

export async function GET(req){
    try {
        const testimonial = await Testimonial.find().sort({ date: -1 });
        return NextResponse.json({"result":testimonial})
    } catch (error) {
        return NextResponse.json({
            "msg":error.message
        }, {status:400})
    }
}
