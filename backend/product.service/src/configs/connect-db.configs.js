import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://huylieu163:16032002@cluster0.xlpoq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      dbName: 'HT-Smart-E-Commerce',
    });
    console.log('🚀 mongoDB connected');
  } catch (error) {
    console.log('MongoDB connected failed!');
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
