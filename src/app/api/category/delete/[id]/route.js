import connectDB from "@/lib/connectDB";
import Category from "@/model/category";
import { NextResponse } from "next/server";

connectDB();

export async function DELETE(req, {params}){
    try {
        let category = await Category.findById(params.id);
        if(!category){
            return NextResponse.json({
                "message":"Category not found to be deleted"
            },{status:400})
        }

        category = await Category.findByIdAndDelete(params.id)
        return NextResponse.json({
            "message":"Category has been deleted",
            success: true
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            "message":error.message
        },{status:500})
        
    }
    
}