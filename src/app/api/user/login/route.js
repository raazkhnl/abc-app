import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import User from "@/model/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB()

export async function POST(req){
    try {
       const reqBody = await req.json()
       const {email, password} = reqBody;

       //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({
                error:"User doesnot exist"
            },
        {
            status:400
        })
        }

        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse({
                error:"Invalid Password"
            },{
                status:400
            })
        }

        //create token data
        const tokenData = {
            id: user._id,
            fullname: user.fullname,
            email : user.email
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn : '1d'})

        const response = NextResponse.json({
            message:"Login Successfull",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true, 
        })

        return response;

    } catch (error) {
        return NextResponse.json(
            {
              message: error.message,
            },
            { status: 500 }
          );
    }
}