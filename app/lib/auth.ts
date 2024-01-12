/* eslint-disable @typescript-eslint/no-explicit-any */
import { createCookie, redirect } from "@remix-run/node";
let secret = process.env.COOKIE_SECRET || "default";
if (secret === "default") {
  console.warn(
    "🚨 No COOKIE_SECRET environment variable set, using default. The app is insecure in production."
  );
  secret = "default-secret";
}

export const sessionStorage = (
  name: string,
  maxAge: number = 60 * 60 * 24 * 30,
  path: string = "/"
) =>
  createCookie(name, {
    httpOnly: true,
    path: path,
    sameSite: "lax",
    secrets: [secret],
    secure: process.env.NODE_ENV === "production",
    maxAge: maxAge,
  });

export const requireAuthCookie = async (request: Request) => {
  const cookieHeader = request.headers.get("Cookie");
  const userId = await sessionStorage("token").parse(cookieHeader);
  if (!userId) {
    throw redirect("/login", {
      headers: [
        [
          "Set-Cookie",
          await sessionStorage("token").serialize("", { maxAge: 0 }),
        ],
      ],
    });
  }
  return userId;
};


interface ExtractedValues {
  [key: string]: string;
}

export function extractValues(
  inputString: string,
  delimiter: string = ";"
): ExtractedValues {
  const result: ExtractedValues = {};

  if (inputString === undefined || inputString === "") {
    return result;
  }

  // Remove line breaks and whitespaces
  const cleanedInput = inputString.replace(/\s+/g, "");

  const components = cleanedInput.split(delimiter);

  for (const component of components) {
    const [key, value] = component.split("=");
    result[key.trim()] = value.trim();
  }

  return result;
}
