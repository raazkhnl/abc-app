import connectDB from "@/lib/connectDB";
import Event from "@/model/event";
import { NextResponse } from "next/server";

connectDB();

export async function DELETE(req, {params}){
    try {
        let event = await Event.findById(params.id);
        if(!event){
            return NextResponse.json({
                "message":"Event Detail not found to be deleted"
            },{status:400})
        }

        event = await Event.findByIdAndDelete(params.id)
        return NextResponse.json({
            "message":"Event has been deleted",
            success: true
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            "message":error.message
        },{status:500})
        
    }
    
}