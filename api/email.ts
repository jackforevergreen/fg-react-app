import { getFirestore, collection, addDoc } from "firebase/firestore";

// Function to send a generic email by adding a document to the 'mail' collection
export const sendEmail = async (
  to: string[],
  subject: string,
  text: string,
  html: string
): Promise<void> => {
  const db = getFirestore();

  try {
    await addDoc(collection(db, "email"), {
      to,
      message: {
        subject,
        text,
        html,
      },
    });
    console.log("Email document added successfully");
  } catch (error) {
    console.error("Error adding email document:", error);
    throw error;
  }
};

// Function to send welcome email
export const sendWelcomeEmail = async (
  email: string,
  name: string
): Promise<void> => {
  const subject = "Welcome to Our App!";
  const text = `Hello ${name},\n\nWelcome to our app! We're excited to have you on board.\n\nBest regards,\nThe App Team`;
  const html = `
    <h2>Welcome to Our App!</h2>
    <p>Hello ${name},</p>
    <p>We're excited to have you on board. Welcome to our community!</p>
    <p>Best regards,<br>The App Team</p>
  `;

  await sendEmail([email], subject, text, html);
};

// Function to send account deletion email
export const sendAccountDeletionEmail = async (
  email: string,
  name: string
): Promise<void> => {
  const subject = "Account Deleted - We're Sorry to See You Go";
  const text = `Hello ${name},\n\nWe're sorry to see you go. Your account has been successfully deleted.\n\nIf you change your mind, you're always welcome back.\n\nBest regards,\nThe App Team`;
  const html = `
    <h2>Account Deleted</h2>
    <p>Hello ${name},</p>
    <p>We're sorry to see you go. Your account has been successfully deleted.</p>
    <p>If you change your mind, you're always welcome back.</p>
    <p>Best regards,<br>The App Team</p>
  `;

  await sendEmail([email], subject, text, html);
};
