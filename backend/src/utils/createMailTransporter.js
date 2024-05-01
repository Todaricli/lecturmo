import dotenv from 'dotenv';
dotenv.config();

import nodeMailer from "nodemailer";

const EMAIL_PASSWORD = process.env.EMAIL_PASS ?? "";

/**
 * create a nodemail instance
 */
export const createMailTransporter = () => {

    const transporter = nodeMailer.createTransport({
        service: "hotmail",
        auth: {
            user: "lecturmon.officials@outlook.com",
            pass: EMAIL_PASSWORD // this need to change to .env variable, but leave it like this for now.
        },
    });

    return transporter;
}