import connectDB from "@/lib/connectDB";
import StudyAbroad from "@/model/studyAbroad";
import { NextResponse } from "next/server";

connectDB();

export async function DELETE(req, {params}){
    try {
        let studyAbroad = await StudyAbroad.findById(params.id);
        if(!studyAbroad){
            return NextResponse.json({
                "message":"StudyAbroad Detail not found to be deleted"
            },{status:400})
        }

        studyAbroad = await StudyAbroad.findByIdAndDelete(params.id)
        return NextResponse.json({
            "message":"StudyAbroad has been deleted",
            success: true
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            "message":error.message
        },{status:500})
        
    }
    
}