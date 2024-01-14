/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
  type MetaFunction,
} from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { VscLoading } from "react-icons/vsc/index.js";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ResponseData } from "~/interface/response_interface";
import { sessionStorage } from "~/lib/auth";
import { ServiceAuthLogin } from "~/service/auth";

export const meta: MetaFunction = () => {
  return [
    { title: "Login Dashboard" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email cannot be empty" })
    .email({ message: "Must valid email address" }),
  password: z.string().nonempty({ message: "Password cannot be empty" }),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const validatedFields = formSchema.safeParse({
    email: data.email,
    password: data.password,
  });

  if (!validatedFields.success) {
    return json({
      errors: validatedFields.error.flatten().fieldErrors,
      message: null,
      data: null,
    });
  }
  // CALL API
  const auth: ResponseData<any> = await ServiceAuthLogin(data);

  if (auth.code === 400) {
    return json({
      errors: null,
      message: auth.data,
      data: null,
    });
  }

  return redirect("/", {
    headers: [
      ["Set-Cookie", await sessionStorage("token").serialize(auth.data.token)],
      ["Set-Cookie", await sessionStorage("userId").serialize("userId")],
    ],
  });
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const userId = await sessionStorage("token").parse(cookieHeader);
  if (userId) {
    throw redirect("/home");
  }
  return userId;
};

export default function Login() {
  const formData = useActionData<typeof action>();
  const navigation = useNavigation();
  return (
    <div className="min-h-screen">
      <div className="container h-screen relative flex-col items-center justify-center grid sm:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6">
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            M Attandance
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to login your account
              </p>
            </div>
            {/* FORM LOGIN */}
            <div className={"grid gap-6"}>
              <Form method="post">
                <FormInput
                  aria-label="Email Address"
                  name="email"
                  type="text"
                  label="Email"
                  placeholder="Email Address"
                  errors={formData?.errors}
                />
                <FormInput
                  aria-label="Password"
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  errors={formData?.errors}
                />
                {formData?.message ? (
                  <em className="text-sm text-red-500">{formData?.message}</em>
                ) : null}

                {navigation.state !== "idle" ? (
                  <Button disabled className="w-full mt-3">
                    <VscLoading className="mt-2 mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit" className="w-full mt-3">
                    Sign In
                  </Button>
                )}
              </Form>
            </div>
            {/* END FORM LOGIN */}
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/"
                className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/"
                className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormInput({
  type,
  name,
  label,
  placeholder,
  defaultValue = "",
  errors,
}: Readonly<{
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  errors: any;
  defaultValue?: string;
}>) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />

      <ul>
        {errors && errors[name]
          ? errors[name].map((error: string) => (
              <li key={error} className="text-xs text-red-500">
                {error}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
