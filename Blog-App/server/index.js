import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import { ErrorHandler } from "./utils/ErrorHandler.js";
import cors from 'cors';
import { connectDB } from "./utils/configDB.js";
dotenv.config();

// connect DB
connectDB();

const app = express();
app.use(express.json()); // parse json data


// cors
app.use(cors({
    origin: [process.env.LOCAL_HOST_CLIENT_URI]
}))

// routes
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

// For Handling Errors
app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
