export function getErrorMessage(error) {
  switch (error?.code) {
    case "unavailable":
    case "deadline-exceeded":
      return "Cannot reach the server. Check your internet connection and try again.";
    case "permission-denied":
      return "You do not have permission to do this. Please log in again.";
    case "unauthenticated":
      return "Your session has expired. Please log in again.";
    case "resource-exhausted":
      return "Too many requests. Please wait a moment and try again.";
    case "not-found":
      return "This record no longer exists. It may have been deleted.";
    default:
      return error?.message || "Something went wrong. Please try again.";
  }
}