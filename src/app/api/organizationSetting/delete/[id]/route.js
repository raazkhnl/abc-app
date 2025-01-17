import connectDB from "@/lib/connectDB";
import Org from "@/model/organizationSetting";
import { NextResponse } from "next/server";


connectDB();

export async function DELETE(req, {params}){
    try {
        let org = await Org.findById(params.id);
        if(!org){
            return NextResponse.json({
                "message":"Org Detail not found to be deleted"
            },{status:400})
        }

        org = await Org.findByIdAndDelete(params.id)
        return NextResponse.json({
            "message":"Organization Detail has been deleted",
            success: true
        },{status:200})
        
    } catch (error) {
        return NextResponse.json({
            "message":error.message
        },{status:500})
        
    }
    
}