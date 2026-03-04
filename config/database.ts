import mongoose from "mongoose";

interface MongooseConnection {
  isConnected?: number;
}

const mongooseConnection: MongooseConnection = {};

export default async function connectDB() {
    mongoose.set("strictQuery", true);
    
    if (mongooseConnection.isConnected) {
        console.log("Connected to MongoDB");
        return;
    }
    
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI!);
        mongooseConnection.isConnected = conn.connections[0].readyState;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        mongooseConnection.isConnected = 0;
    }
}