import connectDB from "@/lib/connectDB";
import About from "@/model/about";
import { NextResponse } from "next/server";

connectDB();

export async function DELETE(req, {params}){
    try {
        let about = await About.findById(params.id);
        if(!about){
            return NextResponse.json({
                "message":"About Detail not found to be deleted"
            },{status:400})
        }

        about = await About.findByIdAndDelete(params.id)
        return NextResponse.json({
            "message":"Selected About has been deleted",
            success: true
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            "message":error.message
        },{status:500})
        
    }
    
}