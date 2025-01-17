import mongoose from "mongoose";
import { 
    SecretsManagerClient, 
    GetSecretValueCommand 
} from "@aws-sdk/client-secrets-manager";

const secretsManager = new SecretsManagerClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export async function getDbUri() {
    try {
        const command = new GetSecretValueCommand({
            SecretId: process.env.SECRET_NAME, 
        });

        const response = await secretsManager.send(command);
        
        if (response.SecretString) {
            try {
                const secret = JSON.parse(response.SecretString);
                return secret.MONGO_URI;
            } catch {
                return response.SecretString;
            }
        }
        
        throw new Error('No secret string found');

    } catch (error) {
        console.error('Error retrieving database URI from Secrets Manager:', error);
        throw error;
    }
}

export default async function (){

    try{
        const uri = await getDbUri();
        await mongoose.connect(`${uri}`)
        console.log("connected Successfully....");
    } catch(error){
        console.log(error);
    }
}