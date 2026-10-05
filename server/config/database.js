import mongoose from "mongoose";

let connectionPromise;

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) return;
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is required");
  if (!connectionPromise)
    connectionPromise = mongoose.connect(process.env.MONGO_URI);
  try {
    await connectionPromise;
  } finally {
    connectionPromise = undefined;
  }
}
