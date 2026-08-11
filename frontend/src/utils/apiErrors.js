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

  const code = error?.code;
  if (
    error?.message === "Network Error" ||
    code === "ERR_NETWORK" ||
    code === "ECONNABORTED" ||
    code === "ERR_CONNECTION_REFUSED"
  ) {
    return "Cannot connect to the server. Make sure the backend is running (npm run dev in the backend folder) and try again.";
  }

  return fallback;
}

export default getApiErrorMessage;
