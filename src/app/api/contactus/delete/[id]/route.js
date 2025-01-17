import connectDB from "@/lib/connectDB";
import ContactUs from "@/model/contactUs";
import { NextResponse } from "next/server";

connectDB();

export async function DELETE(req, {params}){
    try {
        let contact = await ContactUs.findById(params.id);
        if(!contact){
            return NextResponse.json({
                "message":"Contact not found to be deleted"
            },{status:400})
        }

        contact = await ContactUs.findByIdAndDelete(params.id)
        return NextResponse.json({
            "message":"Contact has been deleted",
            success: true
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            "message":error.message
        },{status:500})
        
    }
    
}