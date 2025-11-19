import "dotenv/config";
import { sendEmail, emailTemplates } from "./src/lib/email";

async function testEmailConfiguration() {
  console.log("🧪 Testing Email Configuration...\n");

  // Check if required env variables are set
  const requiredVars = ["EMAIL_FROM"];
  const brevoVars = ["BREVO_SMTP_KEY"];
  const smtpVars = ["SMTP_HOST", "SMTP_USER", "SMTP_PASSWORD"];

  console.log("📋 Environment Check:");
  console.log(`  EMAIL_FROM: ${process.env.EMAIL_FROM ? "✅" : "❌"}`);

  const hasBrevo = process.env.BREVO_SMTP_KEY;
  const hasSmtp = process.env.SMTP_HOST && process.env.SMTP_USER;

  if (hasBrevo) {
    console.log(`  BREVO_SMTP_KEY: ✅`);
    console.log(
      `  BREVO_SMTP_HOST: ${
        process.env.BREVO_SMTP_HOST || "smtp-relay.brevo.com"
      }`
    );
    console.log(`  BREVO_SMTP_PORT: ${process.env.BREVO_SMTP_PORT || "587"}`);
  } else if (hasSmtp) {
    console.log(`  SMTP_HOST: ✅`);
    console.log(`  SMTP_USER: ✅`);
  } else {
    console.error("\n❌ No email service configured!");
    console.error(
      "Please set either BREVO_SMTP_KEY or SMTP credentials in .env file"
    );
    console.error("See BREVO_SETUP.md for instructions\n");
    process.exit(1);
  }

  if (!process.env.EMAIL_FROM) {
    console.error("\n❌ EMAIL_FROM is not set in .env file\n");
    process.exit(1);
  }

  // Get test email from user
  const testEmail = process.argv[2];
  if (!testEmail) {
    console.error("\n❌ Please provide a test email address:");
    console.error("   npx tsx test-email.ts your-email@example.com\n");
    process.exit(1);
  }

  console.log(`\n📧 Sending test email to: ${testEmail}\n`);

  try {
    const template = emailTemplates.verifyEmail(
      "https://yourdomain.com/verify?token=test-token-123",
      "Test User"
    );

    await sendEmail({
      to: testEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    console.log("✅ Test email sent successfully!");
    console.log("📬 Check your inbox (and spam folder)\n");
    console.log(
      "If you received the email, your configuration is correct! 🎉\n"
    );
  } catch (error) {
    console.error("❌ Failed to send test email:");
    console.error(error);
    console.error("\n💡 Common issues:");
    console.error("  - SMTP credentials are incorrect");
    console.error("  - Sender email not verified in Brevo");
    console.error("  - Firewall blocking SMTP ports");
    console.error("  - See BREVO_SETUP.md for troubleshooting\n");
    process.exit(1);
  }
}

testEmailConfiguration();
