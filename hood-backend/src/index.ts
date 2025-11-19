import "dotenv/config";
import express from "express";
import cors from "cors";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import authRoutes from "./routes/auth.route";

const app = express();
const port = process.env.PORT || 8000;

// Security & Middleware Configuration
// Trust proxy for secure cookies behind reverse proxy
app.set("trust proxy", 1);

// Configure CORS middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Allow cookies
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON bodies
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Better Auth Handler (Must be before other routes)
// app.all("/api/auth/{*any}", toNodeHandler(auth));

// auth route
app.use("/api/auth", authRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Protected Route Example
app.get("/api/me", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication required",
        },
      });
    }

    return res.json({
      success: true,
      data: session,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch session",
      },
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: "Route not found",
    },
  });
});

// Global Error Handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Global Error Handler:", err);

    // Handle JSON parsing errors
    if (err instanceof SyntaxError && "body" in err) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_JSON",
          message: "Invalid JSON in request body",
        },
      });
    }

    // Generic error response
    return res.status(err.status || 500).json({
      success: false,
      error: {
        code: err.code || "INTERNAL_SERVER_ERROR",
        message: err.message || "An unexpected error occurred",
      },
    });
  }
);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
