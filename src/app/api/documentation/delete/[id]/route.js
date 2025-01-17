import connectDB from "@/lib/connectDB";
import Documentation from "@/model/documentation";
import { NextResponse } from "next/server";

connectDB();

export async function DELETE(req, {params}){
    try {
        let document = await Documentation.findById(params.id);
        if(!document){
            return NextResponse.json({
                "message":"Document Detail not found to be deleted"
            },{status:400})
        }

        document = await Documentation.findByIdAndDelete(params.id)
        return NextResponse.json({
            "message":"Document has been deleted",
            success: true
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            "message":error.message
        },{status:500})
        
    }
    
}