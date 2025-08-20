import dotenv from "dotenv";
import { registerEmail } from "../services/emailServices.js";
import User from "../models/userModel.js";

dotenv.config();

export const registerUser = async (req, res) => {
    try {
        const { name, email, department } = req.body;

        if (!name || !email || !department) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const newUser = new User({
            name,
            email,
            department
        });

        await newUser.save();

        await registerEmail(email, name);

        return res.status(201).json({
            message: "User registered successfully",
            success: true
        });

    } catch (err) {
        console.error("Error in registerUser:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};