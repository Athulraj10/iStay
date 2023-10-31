
import nodemailer from "nodemailer";
//@desc forgetOTP
//access Public
//route POST// users/forget
// -------------------------SENT OTP NodeMailer---------------------------------------
export const sendForgetPassword = async (name, email, OTP) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.NEW_APP_PASSWORD,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset your Password",
        html: `<p>Hi ${name}, <br> Did you requsted for a Password reset...?<br>If Yes...<br> Your OTP For reset password is ${OTP}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.error("email successfully", info.response);
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  };

