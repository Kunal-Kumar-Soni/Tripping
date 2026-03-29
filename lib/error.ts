import axios from "axios";
import { FirebaseError } from "firebase/app";

export const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error?.response?.data?.message || "Server error occurred";
  }

  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "Email already in use";

      case "auth/invalid-email":
        return "Invalid email";

      case "auth/user-not-found":
        return "User not found";

      case "auth/invalid-credential":
        return "Incorrect password";

      case "auth/weak-password":
        return "Password should be at least 6 characters";

      case "auth/too-many-requests":
        return "Too many attempts, try again later";

      case "auth/network-request-failed":
        return "Check your internet connection";

      default:
        return "Something went wrong";
    }
  }
};
