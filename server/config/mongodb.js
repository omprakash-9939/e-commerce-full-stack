import mongoose from "mongoose";

const connectToMongoDB= async()=>{
    mongoose.connection.on('connected',()=>{
        console.log("MongoDB is connected")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/dataart`);
}
export default connectToMongoDB;
