import { Router } from "express";
import {
  signInEmail,
  signUpEmail,
  signOut,
  sendVerificationEmail,
  verifyEmail,
  requestResetPassword,
  resetPassword,
  changePassword,
  getSession,
} from "../controller/auth.controller";

const router = Router();

// Public Routes (No Authentication Required)

// Sign up with email and password
// POST /api/auth/sign-up
router.post("/sign-up/email", signUpEmail);

// Sign in with email and password
// POST /api/auth/sign-in/email
router.post("/sign-in/email", signInEmail);

// Send email verification link
// POST /api/auth/send-verification-email
router.post("/send-verification-email", sendVerificationEmail);

// Verify email with token (typically from email link)
// GET /api/auth/verify-email?token=xxx
router.get("/verify-email", verifyEmail);

// Request password reset email
// POST /api/auth/request-password-reset
router.post("/request-password-reset", requestResetPassword);

// Reset password with token
// POST /api/auth/reset-passwords
router.post("/reset-password", resetPassword);

// Protected Routes (Authentication Required)

// Get current session
// GET /api/auth/session
//  Headers: session cookie
router.get("/session", getSession);

// Sign out current user
// POST /api/auth/sign-out
// Headers: session cookie
router.post("/sign-out", signOut);

// Change password for authenticated user
// POST /api/auth/change-password
// Headers: session cookie
router.post("/change-password", changePassword);

export default router;
