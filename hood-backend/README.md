# Better Auth Production-Grade Backend

A secure, production-ready authentication backend using Better Auth, Express, and PostgreSQL.

## Features

✅ **Email & Password Authentication**

- Secure sign up and sign in
- Password strength validation (min 8 chars, uppercase, lowercase, number)
- Email verification required before login
- Secure password hashing with scrypt

✅ **Email Verification**

- Automated verification emails with beautiful templates
- Token-based verification
- 24-hour token expiration
- Resend verification email support

✅ **Password Management**

- Forgot password flow with email reset links
- Secure password reset with tokens
- Change password for authenticated users
- Option to revoke other sessions on password change
- 1-hour expiration for reset tokens

✅ **Session Management**

- HTTP-only cookies for security
- Session validation
- Get current session endpoint
- Secure sign out

✅ **Security Features**

- Input validation with Zod schemas
- Comprehensive error handling
- CORS configuration
- Rate limiting ready
- SQL injection protection via Drizzle ORM
- Password complexity requirements
- Email enumeration protection

✅ **Production Ready**

- Environment variable configuration
- Structured error responses
- Health check endpoint
- Proper HTTP status codes
- Detailed API documentation

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Email service: Brevo (Sendinblue) or any SMTP provider

## Installation

1. **Install dependencies:**

```bash
cd hood-backend
npm install
```

2. **Set up environment variables:**
   Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# App
NODE_ENV=production
APP_URL=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com
PORT=8000

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-minimum-32-characters
BETTER_AUTH_URL=https://yourdomain.com

# Email (Brevo)
EMAIL_FROM=noreply@yourdomain.com
BREVO_SMTP_KEY=your-brevo-smtp-key
BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_USER=your-email@yourdomain.com
```

**📧 See [BREVO_SETUP.md](./BREVO_SETUP.md) for detailed email configuration guide.**

3. **Run database migrations:**

```bash
npx drizzle-kit push
```

4. **Start the server:**

```bash
npm start
```

## API Endpoints

### Public Endpoints

#### **POST** `/api/auth/sign-up`

Create a new account

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "image": "https://example.com/avatar.jpg",
  "callbackURL": "https://yourdomain.com/verify-email"
}
```

#### **POST** `/api/auth/sign-in/email`

Sign in with email and password

```json
{
  "email": "john@example.com",
  "password": "SecurePass123",
  "rememberMe": true,
  "callbackURL": "https://yourdomain.com/dashboard"
}
```

#### **POST** `/api/auth/send-verification-email`

Resend verification email

```json
{
  "email": "john@example.com",
  "callbackURL": "https://yourdomain.com/verify-email"
}
```

#### **GET** `/api/auth/verify-email?token=xxx`

Verify email with token (called from email link)

#### **POST** `/api/auth/request-password-reset`

Request password reset email

```json
{
  "email": "john@example.com",
  "redirectTo": "https://yourdomain.com/reset-password"
}
```

#### **POST** `/api/auth/reset-password`

Reset password with token

```json
{
  "newPassword": "NewSecurePass123",
  "token": "reset-token-from-email"
}
```

### Protected Endpoints (Require Authentication)

#### **GET** `/api/auth/session`

Get current user session

#### **POST** `/api/auth/sign-out`

Sign out current user

#### **POST** `/api/auth/change-password`

Change password for authenticated user

```json
{
  "currentPassword": "SecurePass123",
  "newPassword": "NewSecurePass123",
  "revokeOtherSessions": false
}
```

#### **GET** `/api/me`

Get current user information (example protected route)

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    /* response data */
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": [
      /* optional validation errors */
    ]
  }
}
```

## Error Codes

- `VALIDATION_ERROR` - Invalid input data
- `EMAIL_NOT_VERIFIED` - Email verification required
- `INVALID_CREDENTIALS` - Wrong email or password
- `USER_EXISTS` - Account already exists
- `INVALID_TOKEN` - Token expired or invalid
- `UNAUTHORIZED` - Authentication required
- `AUTH_ERROR` - Generic authentication error
- `INTERNAL_SERVER_ERROR` - Server error

## Using the Authentication Middleware

Protect your routes using the provided middleware:

```typescript
import {
  requireAuth,
  requireEmailVerified,
} from "./middleware/auth.middleware";

// Require authentication
app.get("/api/protected", requireAuth, (req, res) => {
  const user = (req as any).user;
  res.json({ message: `Hello ${user.name}` });
});

// Require authentication + email verification
app.get("/api/verified-only", requireAuth, requireEmailVerified, (req, res) => {
  res.json({ message: "You are verified!" });
});
```

## Email Service Setup

### Using Brevo (Recommended)

1. Sign up at [brevo.com](https://brevo.com)
2. Get your SMTP key from Settings → SMTP & API
3. Verify your sender email
4. Add to `.env`:

```env
BREVO_SMTP_KEY=your-smtp-key
EMAIL_FROM=noreply@yourdomain.com
```

**For detailed setup instructions, see [BREVO_SETUP.md](./BREVO_SETUP.md)**

### Using Other SMTP Providers

You can use any SMTP provider by setting these variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
```

## Security Best Practices

1. **Environment Variables**: Never commit `.env` file
2. **HTTPS Only**: Always use HTTPS in production
3. **Secure Cookies**: Enabled by default with Better Auth
4. **CORS**: Configure allowed origins in production
5. **Rate Limiting**: Add rate limiting for auth endpoints
6. **Database**: Use connection pooling and SSL
7. **Secrets**: Use strong random secrets (min 32 characters)

## Development vs Production

### Development

```bash
NODE_ENV=development
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
```

### Production

```bash
NODE_ENV=production
APP_URL=https://api.yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

## Testing the API

Use the provided endpoints with curl or Postman:

```bash
# Sign up
curl -X POST http://localhost:8000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'

# Sign in
curl -X POST http://localhost:8000/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

## Customization

### Email Templates

Edit templates in `src/lib/email.ts` to match your brand.

### Password Requirements

Modify schemas in `src/controller/auth.controller.ts`.

### Token Expiration

Configure in `src/lib/auth.ts`:

- `resetPasswordTokenExpiresIn`: Reset token expiry (seconds)

## Troubleshooting

### Email not sending

- Check BREVO_SMTP_KEY is correct
- Verify EMAIL_FROM is verified in Brevo dashboard
- Check server logs for errors
- See [BREVO_SETUP.md](./BREVO_SETUP.md) for troubleshooting

### Database connection failed

- Verify DATABASE_URL is correct
- Check database is running
- Ensure network access to database

### CORS errors

- Update FRONTEND_URL in .env
- Check CORS configuration in src/index.ts

## License

MIT

## Support

For issues and questions, please open an issue on the repository.
