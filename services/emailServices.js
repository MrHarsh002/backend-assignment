import { transporter } from "../config/emailConfig.js";
import dotenv from "dotenv";

dotenv.config();

export const registerEmail = async (userName, amount, description) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "hr@company.com",
            subject: `New Allowance Request from ${userName}`,
            text: `
                Employee Name: ${userName}
                Amount: ₹${amount}
                Description: ${description}
                Date: ${new Date().toLocaleDateString()}`
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to HR");
    } catch (error) {
        console.error("Something went wrong in registerEmail:", error);
    }
};
