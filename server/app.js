// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const nodemailer = require('nodemailer');


const projectRoutes = require("./routes/projectRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());


app.use("/api/projects", projectRoutes);
app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    // Validate request data
    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        // Create the transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL, // Your email
                pass: process.env.PASSWORD, // Your app password
            },
        });
        
        // Mail options
        const mailOptions = {
            from:process.env.EMAIL, // Sender details
            to: email,       // Your email address to receive messages
            subject: "New Contact Form Submission",
            text: `You received a new message from ${name} (${email}):\n\n${message}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send message. Please try again later." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
