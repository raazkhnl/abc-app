import connectDB from "@/lib/connectDB";
import Blog from "@/model/blog";
import { NextResponse } from "next/server";

connectDB();

export async function DELETE(req, {params}){
    try {
        let blog = await Blog.findById(params.id);
        if(!blog){
            return NextResponse.json({
                "message":"Blog not found to be deleted"
            },{status:400})
        }

        blog = await Blog.findByIdAndDelete(params.id)
        return NextResponse.json({
            "message":"Blog has been deleted",
            success: true
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            "message":error.message
        },{status:500})
        
    }
    
}