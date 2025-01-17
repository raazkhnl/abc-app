import connectDB from "@/lib/connectDB";
import Gallery from "@/model/gallery";
import { NextResponse } from "next/server";

connectDB();

export async function DELETE(req, {params}){
    try {
        let gallery = await Gallery.findById(params.id);
        if(!gallery){
            return NextResponse.json({
                "message":"Gallery Detail not found to be deleted"
            },{status:400})
        }

        gallery = await Gallery.findByIdAndDelete(params.id)
        return NextResponse.json({
            "message":"Gallery has been deleted",
            success: true
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            "message":error.message
        },{status:500})
        
    }
    
}