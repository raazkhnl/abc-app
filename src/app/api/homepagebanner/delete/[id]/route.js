import connectDB from "@/lib/connectDB";
import HomePageBanner from "@/model/homepagebanner";
import { NextResponse } from "next/server";

connectDB();

export async function DELETE(req, {params}){
    try {
        let homePage = await HomePageBanner.findById(params.id);
        if(!homePage){
            return NextResponse.json({
                "message":"homepagebanner not found to be deleted"
            },{status:400})
        }

        homePage = await HomePageBanner.findByIdAndDelete(params.id)
        return NextResponse.json({
            "message":"HomePageBanner has been deleted",
            success: true
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            "message":error.message
        },{status:500})
        
    }
    
}