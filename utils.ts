import { state } from "membrane";
import fetch from "node-fetch";

export async function api(
  method: "GET" | "POST",
  url: string,
  body?: string | object
) {
  return await fetch(url, {
    method,
    body: typeof body === "object" ? JSON.stringify(body) : body,
    headers: {
      Authorization: `Bearer ${state.token}`,
      "Content-Type": "application/json",
    },
  });
}

// Parse Query String
export const parseQS = (qs: string): Record<string, string> =>
  Object.fromEntries(new URLSearchParams(qs).entries());