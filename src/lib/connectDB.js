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

// Name the function you are exporting as default
export default async function connectToDatabase() {
    try {
        const uri = await getDbUri();
        await mongoose.connect(`${uri}`);
        console.log("Connected Successfully...");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}