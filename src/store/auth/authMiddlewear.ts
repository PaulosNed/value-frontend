import { Middleware } from "@reduxjs/toolkit";
import { signOut } from "next-auth/react";

// Create a custom middleware to intercept responses
const authMiddleware: Middleware = (storeAPI) => (next) => (action: any) => {
  // Check if the action has a meta field (typical for RTK Query actions)
  if (
    action?.meta?.arg?.endpointName &&
    action?.meta?.baseQueryMeta?.response?.status === 401
  ) {
    // If a 401 error is returned, sign out the user

    signOut({ redirect: false })
      .then(() => {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
          alert("Session Expired. Please sign in again.");
        }
      })
      .catch((error) => {
        console.error("Failed to sign out:", error);
      });
  }

  // Continue with the next middleware or the reducer
  return next(action);
};

export default authMiddleware;
