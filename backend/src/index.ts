declare global {
namespace Express{
export interface Request{
userId ?: string;
      }
  }
}

import express from "express"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from 'dotenv';

import { ContentModel, UserModel } from "./db";
import { contentSchema, signinSchema, signupSchema } from "./zod"
import { userMiddleware } from "./userMiddleware";


dotenv.config();

const { MONGO_URI, JWT_PASSWORD } = process.env;
if (!MONGO_URI) throw new Error("MONGO_URI is missing in environment variables");
if (!JWT_PASSWORD) throw new Error("JWT_PASSWORD is missing in environment variables");

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

console.log(process.env.MONGO_URI)
console.log(process.env.JWT_PASSWORD)

const app = express();
app.use(express.json());

app.listen(3000);

app.post("/api/v1/signup", async (req, res) => {
  try {
    // Validate request body
    const validate = signupSchema.safeParse(req.body);
    if (!validate.success) {
      return res.status(400).json({
        message: "Invalid input",
      });
    }

    const { username, password } = validate.data;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(403).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await UserModel.create({
      username,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_PASSWORD!);

    // Respond with success
    return res.status(200).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      message: "Error while signing up",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  console.log("process start")
  try {
    // Validate request with Zod
    const parsed = signinSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Error in inputs",
      });
    }

    const { username, password } = parsed.data;
    // Find user in DB
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "User does not exist in the database",
      });
    }
    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
       return res.status(403).json({
        message: "Incorrect password",
      });
    }
    //Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_PASSWORD!);

    //Send success response
    return res.status(200).json({
      message: "Signin successful",
      token: token,
       });
    }catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({
      message: "Error while signing in",
    });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    try {
        const validate = contentSchema.safeParse(req.body);
        if (!validate.success) {
            console.log("Validation failed:", validate.error);
            return res.status(411).json({
                message: "Error in input everything must be in string",
            });
        }

        const { title, link } = validate.data;

        // Ensure that req.userId is not undefined before proceeding
        if (!req.userId) {
            return res.status(403).json({ message: "User not authenticated, missing userId" });
        }

        await ContentModel.create({
            title,
            link,
            userId: req.userId,  
            tags: []
        });

        return res.status(200).json({
            message: "Content Added Successfully"
        });

    } catch (e) {
        console.log("Content route error:", e);
        return res.status(400).json({
            message: "Errorrr",
            error: e  
        });
    }
});


app.get("/api/v1/content", (req, res) => {
    
})

app.delete("/api/v1/content", (req, res) => {
    
})

app.post("/api/v1/brain/share", (req, res) => {
    
})

app.get("/api/v1/brain/:shareLink", (req, res) => {
    
})