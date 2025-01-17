import connectDB from "@/lib/connectDB";
import TestPreparation from "@/model/testPreparation";
import { NextResponse } from "next/server";

connectDB();

export async function DELETE(req, {params}){
    try {
        let testPreparation = await TestPreparation.findById(params.id);
        if(!testPreparation){
            return NextResponse.json({
                "message":"TestPreparation Detail not found to be deleted"
            },{status:400})
        }

        testPreparation = await TestPreparation.findByIdAndDelete(params.id)
        return NextResponse.json({
            "message":"TestPreparation has been deleted",
            success: true
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            "message":error.message
        },{status:500})
        
    }
    
}