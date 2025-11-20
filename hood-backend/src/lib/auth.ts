import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index"; // your drizzle instance
import { sendEmail, emailTemplates } from "./email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  // baseURL should be your backend URL where Better Auth is running
  baseURL: `http://localhost:${process.env.PORT || 8000}`,
  secret: process.env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,

    // Send password reset email
    async sendResetPassword({ user, url, token }: any, request: any) {
      const template = emailTemplates.resetPassword(url, user.name);

      try {
        await sendEmail({
          to: user.email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        });
      } catch (error) {
        throw error;
      }
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

  // Email verification configuration (root level, not inside emailAndPassword)
  emailVerification: {
    async sendVerificationEmail({ user, url, token }: any, request: any) {
      const template = emailTemplates.verifyEmail(url, user.name);

      try {
        await sendEmail({
          to: user.email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        });
      } catch (error) {
        throw error; // Re-throw to let Better Auth handle it
      }
    },
  },

  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID as string,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  //   },
  // },
});
