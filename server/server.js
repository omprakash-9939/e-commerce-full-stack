import express from 'express';
import cors from 'cors'
import "dotenv/config";
import connectToMongoDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import aiRoutes from "./routes/aiRoutes.js";
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import aiRoute from './routes/aiRoute.js'

// App confi
const app = express();
const port = process.env.PORT || 4000;

connectToMongoDB();
connectCloudinary();


// middlewares
app.use(express.json()); // adds middleware that parses incoming JSON request bodies and makes them available as req.body.
app.use(cors());


// API endpoints 
app.use("/api", aiRoutes);
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use("/api/ai", aiRoute);
// app.use("/admin", adminRoutes);
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)



app.get("/", (req, res)=>{
    res.send("Hello DataArt India")
})

app.listen(port, ()=> console.log(`Server is running on ${port}`))
