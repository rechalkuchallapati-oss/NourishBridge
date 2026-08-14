/**
 * Normalize backend ApiError responses into user-friendly messages.
 * Never exposes secrets — only safe, user-facing text.
 */
export function getApiErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  const data = error?.response?.data;

  if (data?.errors?.length) {
    return data.errors.map((e) => e.message).filter(Boolean).join(" ");
  }

  if (data?.message) {
    return data.message;
  }

  const code = error?.code;
  if (
    error?.message === "Network Error" ||
    code === "ERR_NETWORK" ||
    code === "ECONNABORTED" ||
    code === "ERR_CONNECTION_REFUSED"
  ) {
    return "Cannot connect to the server. Make sure the backend is running (npm run dev in the backend folder) and try again.";
  }

  if (code === "ERR_BAD_REQUEST" && !data?.message) {
    return "The server could not process your request. Check your details and try again.";
  }

  const plainMessage = error?.message?.trim();
  if (plainMessage && plainMessage !== "Network Error") {
    if (import.meta.env.DEV) {
      console.error("[API error]", error);
    }
    return plainMessage;
  }

  if (import.meta.env.DEV && error) {
    console.error("[API error]", error);
  }

  return fallback;
}

export default getApiErrorMessage;
