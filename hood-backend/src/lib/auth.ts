import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index"; // your drizzle instance
import { sendEmail, emailTemplates } from "./email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:8000",
  secret: process.env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,

    // Send verification email
    async sendVerificationEmail({ user, url, token }: any, request: any) {
      const template = emailTemplates.verifyEmail(url, user.name);
      await sendEmail({
        to: user.email,
        subject: template.subject,
        html: template.html,
        text: template.text,
      });
    },

    // Send password reset email
    async sendResetPassword({ user, url, token }: any, request: any) {
      const template = emailTemplates.resetPassword(url, user.name);
      await sendEmail({
        to: user.email,
        subject: template.subject,
        html: template.html,
        text: template.text,
      });
    },

    // Callback after password reset
    async onPasswordReset({ user }: any, request: any) {
      const template = emailTemplates.passwordChanged(user.name);
      await sendEmail({
        to: user.email,
        subject: template.subject,
        html: template.html,
        text: template.text,
      });
    },

    // Reset token expires in 1 hour
    resetPasswordTokenExpiresIn: 3600,
  },

  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID as string,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  //   },
  // },
});
