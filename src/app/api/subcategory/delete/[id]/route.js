import connectDB from "@/lib/connectDB";
import SubCategory from "@/model/subCategory";
import { NextResponse } from "next/server";

connectDB();

export async function DELETE(req, {params}){
    try {
        let subCategory = await SubCategory.findById(params.id);
        if(!subCategory){
            return NextResponse.json({
                "message":"SubCategory Detail not found to be deleted"
            },{status:400})
        }

        subCategory = await SubCategory.findByIdAndDelete(params.id)
        return NextResponse.json({
            "message":"SubCategory has been deleted",
            success: true
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            "message":error.message
        },{status:500})
        
    }
    
}