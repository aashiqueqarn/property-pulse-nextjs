import mongoose from "mongoose";
let connected = false;

export default async function connectDB() {
    mongoose.set("strictQuery", true);
    if (connected) {
        console.log("Connected to MongoDB");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        connected = true;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        connected = false;
    }
}