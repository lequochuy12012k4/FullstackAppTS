import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const connectUsersDB = async () => {
    try {
        const mongodb_url = process.env.MONGODB_URL
        const conn = await mongoose.connect(mongodb_url as string, { dbName: 'users' });
        console.log('MongoDB Users Connected:')
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectUsersDB;