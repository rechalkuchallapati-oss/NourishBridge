/**
 * Normalize backend ApiError responses into user-friendly messages.
 */
export function getApiErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  const data = error?.response?.data;

  if (data?.errors?.length) {
    return data.errors.map((e) => e.message).join(" ");
  }

  if (data?.message) {
    return data.message;
  }

  if (error?.message === "Network Error") {
    return "Unable to reach the server. Check your connection and try again.";
  }

  return fallback;
}

export default getApiErrorMessage;
