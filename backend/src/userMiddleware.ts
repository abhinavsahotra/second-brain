import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];

    if (!header) {
        console.log("No authorization header found");
        return res.status(403).json({ message: "Authorization header missing" });
    }

    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : header;

    try {
        const decoded = jwt.verify(token as string, process.env.JWT_PASSWORD!) as JwtPayload;
        req.userId = decoded.id;  
        next();  
    } catch (err) {
        console.log("Error verifying token:", err);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}
