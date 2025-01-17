import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";
import User from "@/model/User";
import connectDB from "@/lib/connectDB";

connectDB();

export async function GET(req){
    try {
        const userId = await getDataFromToken(req);
        const user = await User.findOne({_id : userId})
        const {fullname, email} = user
        return NextResponse.json({
           "message" : "user found",
            fullname, email
        }
        )
    } catch (error) {
        return NextResponse.json({
            "message": error.message
        },{
            status:400
        })
    }
}