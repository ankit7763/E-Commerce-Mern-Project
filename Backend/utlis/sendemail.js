const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const mailoptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text
        };
        await transporter.sendMail(mailoptions);
    }
    catch (error) {
        console.log('Error sending email', error);

    }
};

module.exports = sendEmail