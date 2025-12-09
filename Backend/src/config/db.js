import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`conection with db on port: ${conn.connection.host}`);
    } catch (error) {
        console.log(`conection with db is filed`);
        process.exit(1);
    }
}
export default db;