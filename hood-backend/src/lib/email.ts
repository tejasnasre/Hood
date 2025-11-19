import nodemailer from "nodemailer";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Create reusable transporter
const createTransporter = () => {
  // Brevo (Sendinblue) SMTP configuration
  if (process.env.BREVO_SMTP_KEY) {
    return nodemailer.createTransport({
      host: process.env.BREVO_SMTP_HOST || "smtp-relay.brevo.com",
      port: parseInt(process.env.BREVO_SMTP_PORT || "587"),
      secure: false, // Use TLS
      auth: {
        user: process.env.BREVO_SMTP_USER || process.env.EMAIL_FROM,
        pass: process.env.BREVO_SMTP_KEY,
      },
    });
  }

  // Generic SMTP configuration (fallback)
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  throw new Error(
    "Email service not configured. Please set BREVO_SMTP_KEY or SMTP credentials."
  );
};

export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  try {
    console.log(`📧 Attempting to send email to: ${to}`);
    console.log(`📧 Subject: ${subject}`);

    const transporter = createTransporter();

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || "noreply@example.com",
      to,
      subject,
      html,
      text: text || subject,
    });

    console.log("✅ Email sent successfully:", info.messageId);
    console.log("✅ Email accepted:", info.accepted);
    return { success: true, data: info };
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw new Error(
      `Failed to send email: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// Email templates
export const emailTemplates = {
  verifyEmail: (url: string, userName: string) => ({
    subject: "Verify your email address",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background-color: #f9f9f9;
              border-radius: 8px;
              padding: 30px;
              border: 1px solid #e0e0e0;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background-color: #007bff;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 30px;
              font-size: 12px;
              color: #666;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Verify Your Email</h1>
            </div>
            <p>Hi ${userName},</p>
            <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
            <div style="text-align: center;">
              <a href="${url}" class="button">Verify Email</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${url}</p>
            <p>This link will expire in 24 hours.</p>
            <div class="footer">
              <p>If you didn't create an account, please ignore this email.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Hi ${userName},\n\nThank you for signing up! Please verify your email address by clicking the link below:\n\n${url}\n\nThis link will expire in 24 hours.\n\nIf you didn't create an account, please ignore this email.`,
  }),

  resetPassword: (url: string, userName: string) => ({
    subject: "Reset your password",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background-color: #f9f9f9;
              border-radius: 8px;
              padding: 30px;
              border: 1px solid #e0e0e0;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background-color: #dc3545;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
            .warning {
              background-color: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 12px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 30px;
              font-size: 12px;
              color: #666;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Reset Your Password</h1>
            </div>
            <p>Hi ${userName},</p>
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            <div style="text-align: center;">
              <a href="${url}" class="button">Reset Password</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${url}</p>
            <div class="warning">
              <strong>⚠️ Security Notice:</strong> This link will expire in 1 hour for security reasons.
            </div>
            <div class="footer">
              <p>If you didn't request a password reset, please ignore this email or contact support if you're concerned.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Hi ${userName},\n\nWe received a request to reset your password. Click the link below to create a new password:\n\n${url}\n\nThis link will expire in 1 hour for security reasons.\n\nIf you didn't request a password reset, please ignore this email or contact support if you're concerned.`,
  }),

  passwordChanged: (userName: string) => ({
    subject: "Your password has been changed",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background-color: #f9f9f9;
              border-radius: 8px;
              padding: 30px;
              border: 1px solid #e0e0e0;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .success {
              background-color: #d4edda;
              border-left: 4px solid #28a745;
              padding: 12px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 30px;
              font-size: 12px;
              color: #666;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Changed Successfully</h1>
            </div>
            <p>Hi ${userName},</p>
            <div class="success">
              <strong>✓ Success:</strong> Your password has been changed successfully.
            </div>
            <p>If you didn't make this change, please contact our support team immediately.</p>
            <div class="footer">
              <p>This is an automated notification. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Hi ${userName},\n\nYour password has been changed successfully.\n\nIf you didn't make this change, please contact our support team immediately.`,
  }),
};
