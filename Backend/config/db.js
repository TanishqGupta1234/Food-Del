import mongoose from "mongoose";

export const connectDB = async () => {
  const password = 'tanishq123'; // replace with your actual database password
  const connectionString = `mongodb+srv://tanishqprojects:${password}@cluster0.d5icr.mongodb.net/food-del`;

  try {
    await mongoose.connect(connectionString);
    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
};