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

export const parseQueryString = (search: string): Record<string, string> =>
  (search || "")
    .replace(/^\?/g, "")
    .split("&")
    .reduce((acc, query) => {
      const [key, value] = query.split("=");

      if (key) {
        acc[key] = decodeURIComponent(value);
      }

      return acc;
    }, {} as Record<string, string>);
