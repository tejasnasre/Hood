import { auth } from "../lib/auth";
import type { Request, Response } from "express";
import { z } from "zod";
import { fromNodeHeaders } from "better-auth/node";

const signInSchema = z.object({
  email: z
    .email("Invalid email address")
    .min(1, "Email is required")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters"),
  rememberMe: z.boolean().optional().default(true),
  // callbackURL: z.url().optional(),
});

const signUpSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must not exceed 100 characters")
    .trim(),
  email: z
    .email("Invalid email address")
    .min(1, "Email is required")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  image: z.url("Invalid image URL").optional(),
  // callbackURL: z.url().optional(),
});

const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  token: z.string().min(1, "Reset token is required"),
});

const requestResetPasswordSchema = z.object({
  email: z
    .email("Invalid email address")
    .min(1, "Email is required")
    .toLowerCase()
    .trim(),
  redirectTo: z.string().url("Invalid redirect URL").optional(),
});

const changePasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters")
    .max(128, "New password must not exceed 128 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  currentPassword: z.string().min(1, "Current password is required"),
  revokeOtherSessions: z.boolean().optional().default(false),
});

const sendVerificationEmailSchema = z.object({
  email: z
    .email("Invalid email address")
    .min(1, "Email is required")
    .toLowerCase()
    .trim(),
  callbackURL: z.string().url().optional(),
});

const verifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is required"),
});

// Error Handler Utility
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

const handleError = (error: any, res: Response): Response<ErrorResponse> => {
  console.error("Auth Controller Error:", error);

  // Validation errors
  if (error instanceof z.ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid input data",
        details: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
    });
  }

  // Better Auth specific errors
  if (error?.status || error?.statusCode) {
    // Handle both error.status and error.statusCode, and ensure it's a number
    const statusCode =
      typeof error.status === "number"
        ? error.status
        : typeof error.statusCode === "number"
        ? error.statusCode
        : typeof error.status === "string" && !isNaN(Number(error.status))
        ? Number(error.status)
        : typeof error.statusCode === "string" &&
          !isNaN(Number(error.statusCode))
        ? Number(error.statusCode)
        : 500;

    const message =
      error.message || error.body?.message || "Authentication failed";

    // Email not verified
    if (statusCode === 403 && message.includes("email")) {
      return res.status(403).json({
        success: false,
        error: {
          code: "EMAIL_NOT_VERIFIED",
          message: "Please verify your email address before signing in",
        },
      });
    }

    // Invalid credentials
    if (statusCode === 401) {
      return res.status(401).json({
        success: false,
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Invalid email or password",
        },
      });
    }

    // User already exists (422 or 400)
    if (
      (statusCode === 422 || statusCode === 400) &&
      (message.includes("exists") || message.includes("already"))
    ) {
      return res.status(409).json({
        success: false,
        error: {
          code: "USER_EXISTS",
          message: "An account with this email already exists",
        },
      });
    }

    // Token invalid or expired
    if (statusCode === 400 && message.includes("token")) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_TOKEN",
          message: "The token is invalid or has expired",
        },
      });
    }

    return res.status(statusCode).json({
      success: false,
      error: {
        code: "AUTH_ERROR",
        message,
      },
    });
  }

  // Generic server error
  return res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred. Please try again later.",
    },
  });
};

// Main Controller

// Sign up a new user with email and password
// POST /api/auth/sign-up
export const signUpEmail = async (req: Request, res: Response) => {
  try {
    const validatedData = signUpSchema.parse(req.body);

    const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
    const callbackURL = `${frontendURL}/auth/verify-email`;

    const data = await auth.api.signUpEmail({
      body: {
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password,
        image: validatedData.image,
        callbackURL,
      },
      headers: fromNodeHeaders(req.headers),
    });

    return res.status(201).json({
      success: true,
      message:
        "Account created successfully. Please check your email to verify your account.",
      data: {
        user: data?.user || null,
      },
    });
  } catch (error) {
    return handleError(error, res);
  }
};

// Sign in with email and password
// POST /api/auth/sign-in/email
export const signInEmail = async (req: Request, res: Response) => {
  try {
    const validatedData = signInSchema.parse(req.body);

    const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
    const callbackURL = `${frontendURL}/dashboard`;

    const data = await auth.api.signInEmail({
      body: {
        email: validatedData.email,
        password: validatedData.password,
        rememberMe: validatedData.rememberMe,
        callbackURL,
      },
      headers: fromNodeHeaders(req.headers),
    });

    return res.json({
      success: true,
      message: "Signed in successfully",
      data: {
        user: data?.user || null,
      },
    });
  } catch (error) {
    return handleError(error, res);
  }
};

// Sign out the current user
// POST /api/auth/sign-out
export const signOut = async (req: Request, res: Response) => {
  try {
    await auth.api.signOut({
      headers: fromNodeHeaders(req.headers),
    });

    return res.json({
      success: true,
      message: "Signed out successfully",
    });
  } catch (error) {
    return handleError(error, res);
  }
};

// Send verification email to user
// POST /api/auth/send-verification-email
export const sendVerificationEmail = async (req: Request, res: Response) => {
  try {
    const validatedData = sendVerificationEmailSchema.parse(req.body);

    const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
    const callbackURL =
      validatedData.callbackURL || `${frontendURL}/auth/verify-email`;

    await auth.api.sendVerificationEmail({
      body: {
        email: validatedData.email,
        callbackURL,
      },
      headers: fromNodeHeaders(req.headers),
    });

    return res.json({
      success: true,
      message: "Verification email sent successfully. Please check your inbox.",
    });
  } catch (error) {
    return handleError(error, res);
  }
};

// Verify email with token
// GET /api/auth/verify-email
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;
    const validatedData = verifyEmailSchema.parse({ token });

    await auth.api.verifyEmail({
      query: {
        token: validatedData.token,
      },
      headers: fromNodeHeaders(req.headers),
    });

    return res.json({
      success: true,
      message: "Email verified successfully. You can now sign in.",
    });
  } catch (error) {
    return handleError(error, res);
  }
};

// Request password reset
// POST /api/auth/request-password-reset
export const requestResetPassword = async (req: Request, res: Response) => {
  try {
    const validatedData = requestResetPasswordSchema.parse(req.body);

    const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
    const redirectTo =
      validatedData.redirectTo || `${frontendURL}/auth/reset-password`;

    await auth.api.forgetPassword({
      body: {
        email: validatedData.email,
        redirectTo,
      },
      headers: fromNodeHeaders(req.headers),
    });

    return res.json({
      success: true,
      message:
        "If an account exists with this email, you will receive a password reset link.",
    });
  } catch (error) {
    // Always return success to prevent email enumeration
    return res.json({
      success: true,
      message:
        "If an account exists with this email, you will receive a password reset link.",
    });
  }
};

// Reset password with token
// POST /api/auth/reset-password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const validatedData = resetPasswordSchema.parse(req.body);

    await auth.api.resetPassword({
      body: {
        newPassword: validatedData.newPassword,
        token: validatedData.token,
      },
      headers: fromNodeHeaders(req.headers),
    });

    return res.json({
      success: true,
      message:
        "Password reset successfully. You can now sign in with your new password.",
    });
  } catch (error) {
    return handleError(error, res);
  }
};

// Change password for authenticated user
// POST /api/auth/change-password
export const changePassword = async (req: Request, res: Response) => {
  try {
    const validatedData = changePasswordSchema.parse(req.body);

    await auth.api.changePassword({
      body: {
        newPassword: validatedData.newPassword,
        currentPassword: validatedData.currentPassword,
        revokeOtherSessions: validatedData.revokeOtherSessions,
      },
      headers: fromNodeHeaders(req.headers),
    });

    return res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return handleError(error, res);
  }
};

// Get current session
// GET /api/auth/session
export const getSession = async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "No active session found",
        },
      });
    }

    return res.json({
      success: true,
      data: session,
    });
  } catch (error) {
    return handleError(error, res);
  }
};
