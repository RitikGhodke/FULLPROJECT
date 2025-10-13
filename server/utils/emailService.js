// import nodemailer from "nodemailer";

// // ✅ Gmail SMTP Configuration
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER, // Your Gmail
//     pass: process.env.EMAIL_PASS, // App Password (not regular password)
//   },
// });

// // ✅ Send OTP Email
// export const sendOTPEmail = async (email, otp) => {
//   const mailOptions = {
//     from: `"AI Robots Marketplace" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "🔐 Your OTP for Account Verification",
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px;">
//         <div style="background: white; padding: 30px; border-radius: 8px;">
//           <h1 style="color: #667eea; text-align: center; margin-bottom: 20px;">🤖 AI Robots</h1>
          
//           <h2 style="color: #1e293b; margin-bottom: 16px;">Verify Your Email</h2>
          
//           <p style="color: #64748b; font-size: 16px; line-height: 1.6;">
//             Thank you for registering! Use the OTP below to complete your registration:
//           </p>
          
//           <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; text-align: center; margin: 24px 0;">
//             <h1 style="color: #667eea; font-size: 36px; letter-spacing: 8px; margin: 0;">
//               ${otp}
//             </h1>
//           </div>
          
//           <p style="color: #64748b; font-size: 14px;">
//             This OTP is valid for <strong>10 minutes</strong>.
//           </p>
          
//           <p style="color: #64748b; font-size: 14px;">
//             If you didn't request this, please ignore this email.
//           </p>
          
//           <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
          
//           <p style="color: #94a3b8; font-size: 12px; text-align: center;">
//             © 2025 AI Robots Marketplace. All rights reserved.
//           </p>
//         </div>
//       </div>
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`✅ OTP sent to ${email}`);
//     return true;
//   } catch (error) {
//     console.error("❌ Email send error:", error);
//     return false;
//   }
// };

// // ✅ Generate 6-digit OTP
// export const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };





// import nodemailer from "nodemailer";

// // ✅ Gmail SMTP with Port 587 (TLS)
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // Use STARTTLS
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false,
//     ciphers: 'SSLv3'
//   },
//   connectionTimeout: 10000, // 10 seconds
//   greetingTimeout: 10000,
//   socketTimeout: 10000
// });

// // ✅ Send OTP Email
// export const sendOTPEmail = async (email, otp) => {
//   const mailOptions = {
//     from: `"AI Robots Marketplace" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "🔐 Your OTP for Account Verification",
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px;">
//         <div style="background: white; padding: 30px; border-radius: 8px;">
//           <h1 style="color: #667eea; text-align: center; margin-bottom: 20px;">🤖 AI Robots</h1>
          
//           <h2 style="color: #1e293b; margin-bottom: 16px;">Verify Your Email</h2>
          
//           <p style="color: #64748b; font-size: 16px; line-height: 1.6;">
//             Thank you for registering! Use the OTP below to complete your registration:
//           </p>
          
//           <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; text-align: center; margin: 24px 0;">
//             <h1 style="color: #667eea; font-size: 36px; letter-spacing: 8px; margin: 0;">
//               ${otp}
//             </h1>
//           </div>
          
//           <p style="color: #64748b; font-size: 14px;">
//             This OTP is valid for <strong>10 minutes</strong>.
//           </p>
          
//           <p style="color: #64748b; font-size: 14px;">
//             If you didn't request this, please ignore this email.
//           </p>
          
//           <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
          
//           <p style="color: #94a3b8; font-size: 12px; text-align: center;">
//             © 2025 AI Robots Marketplace. All rights reserved.
//           </p>
//         </div>
//       </div>
//     `,
//   };

//   try {
//     console.log(`🔹 Attempting to send email to: ${email}`);
//     console.log(`🔹 Using SMTP: smtp.gmail.com:587`);
//     console.log(`🔹 From email: ${process.env.EMAIL_USER}`);
    
//     const info = await transporter.sendMail(mailOptions);
    
//     console.log(`✅ OTP email sent successfully to ${email}`);
//     console.log(`✅ Message ID: ${info.messageId}`);
    
//     return true;
//   } catch (error) {
//     console.error("❌ Email send error:", error.message);
//     console.error("❌ Full error:", error);
    
//     // Return false but don't crash
//     return false;
//   }
// };

// // ✅ Generate 6-digit OTP
// export const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // ✅ Verify transporter connection (optional test)
// export const verifyConnection = async () => {
//   try {
//     await transporter.verify();
//     console.log("✅ SMTP connection verified successfully");
//     return true;
//   } catch (error) {
//     console.error("❌ SMTP connection failed:", error.message);
//     return false;
//   }
// };








// import sgMail from "@sendgrid/mail";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// export const sendOTPEmail = async (email, otp) => {
//   const msg = {
//     to: email,
//     from: process.env.SENDGRID_FROM_EMAIL, // Verified sender email
//     subject: "🔐 Your OTP for Account Verification",
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px;">
//         <div style="background: white; padding: 30px; border-radius: 8px;">
//           <h1 style="color: #667eea; text-align: center; margin-bottom: 20px;">🤖 AI Robots</h1>
          
//           <h2 style="color: #1e293b; margin-bottom: 16px;">Verify Your Email</h2>
          
//           <p style="color: #64748b; font-size: 16px; line-height: 1.6;">
//             Thank you for registering! Use the OTP below to complete your registration:
//           </p>
          
//           <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; text-align: center; margin: 24px 0;">
//             <h1 style="color: #667eea; font-size: 36px; letter-spacing: 8px; margin: 0;">
//               ${otp}
//             </h1>
//           </div>
          
//           <p style="color: #64748b; font-size: 14px;">
//             This OTP is valid for <strong>10 minutes</strong>.
//           </p>
          
//           <p style="color: #64748b; font-size: 14px;">
//             If you didn't request this, please ignore this email.
//           </p>
          
//           <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
          
//           <p style="color: #94a3b8; font-size: 12px; text-align: center;">
//             © 2025 AI Robots Marketplace. All rights reserved.
//           </p>
//         </div>
//       </div>
//     `,
//   };

//   try {
//     await sgMail.send(msg);
//     console.log(`✅ OTP sent to ${email}`);
//     return true;
//   } catch (error) {
//     console.error("❌ Email send error:", error);
//     return false;
//   }
// };

// export const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };