import mongoose from "mongoose";

export const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_DB}/store-${process.env.STORE_ENVIRONMENT}?retryWrites=true&w=majority`;

export const connectToMongo = async (): Promise<void> => {
  try {
    console.log("connection to: ", mongoUrl);
    await mongoose.connect(mongoUrl);
  } catch (error) {
    throw new Error("error connecting to mongoDb")
  }
};
