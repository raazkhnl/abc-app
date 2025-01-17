import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import Testimonial from "@/model/Testimonials";


connectDB();

export async function DELETE(req, {params}){
    try {
        let testimonial = await Testimonial.findById(params.id);
        if(!testimonial){
            return NextResponse.json({
                "message":"Testimonial not found to be deleted"
            },{status:400})
        }

        testimonial = await Testimonial.findByIdAndDelete(params.id)
        return NextResponse.json({
            "message":"Testimonial has been deleted",
            success: true
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            "message":error.message
        },{status:500})
        
    }
    
}