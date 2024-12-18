const nodemailer = require('nodemailer');

const sendEmail = async ({ name, email, subject, message }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: `"${name}" <${email}>`, // Sender's name and email
        to: process.env.EMAIL,        // Your email to receive messages
        subject: subject,             // Email subject
        text: message,                // Plain text body
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
};

module.exports = sendEmail;
