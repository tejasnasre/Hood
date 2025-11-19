import type { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

// Middleware to check if user is authenticated
//Attaches session and user to request object
export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || !session.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication required. Please sign in.",
        },
      });
    }

    // Attach session to request for use in controllers
    (req as any).session = session.session;
    (req as any).user = session.user;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Invalid or expired session",
      },
    });
  }
};

// Middleware to check if user's email is verified
// Must be used after requireAuth
export const requireEmailVerified = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;

  if (!user) {
    return res.status(401).json({
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication required",
      },
    });
  }

  if (!user.emailVerified) {
    return res.status(403).json({
      success: false,
      error: {
        code: "EMAIL_NOT_VERIFIED",
        message: "Please verify your email address to access this resource",
      },
    });
  }

  next();
};

// Optional auth middleware - attaches session if present but doesn't require it
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (session && session.user) {
      (req as any).session = session.session;
      (req as any).user = session.user;
    }

    next();
  } catch (error) {
    // Continue without auth if there's an error
    next();
  }
};
