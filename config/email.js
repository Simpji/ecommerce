const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config()

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'brenden.wilderman@ethereal.email',
        pass: 'ZxANykBpqkbeKur3x4'
    }
});

module.exports = transporter;