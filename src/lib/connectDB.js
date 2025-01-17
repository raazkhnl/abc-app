import mongoose from "mongoose";

export default async function (){

    try{
        const DB_OPTIONS = {
            dbname : process.env.DBNAME,
            user : process.env.DBUSERNAME,
            pass : process.env.DBPASSWORD,
            authsource : process.env.DBAUTHSOURCE,
        }

        await mongoose.connect(process.env.DATABASE_URL)
        console.log("connected Successfully....");
    } catch(error){
        console.log(error);
    }
}