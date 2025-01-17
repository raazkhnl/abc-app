import connectDB from "@/lib/connectDB";
import Inquiries from "@/model/inquiries";
import { NextResponse } from "next/server";

connectDB();

export async function DELETE(req, {params}){
    try {
        let inquiry = await Inquiries.findById(params.id);
        if(!inquiry){
            return NextResponse.json({
                "message":"Inquiries Detail not found to be deleted"
            },{status:400})
        }

        inquiry = await Inquiries.findByIdAndDelete(params.id)
        return NextResponse.json({
            "message":"Inquiries has been deleted",
            success: true
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            "message":error.message
        },{status:500})
        
    }
    
}