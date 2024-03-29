/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import {
  LoaderFunctionArgs,
  redirect,
  type MetaFunction,
} from "@remix-run/node";
import PageLayout from "~/components/template/base/page_layout";
import { requireAuthCookie } from "~/lib/auth";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard Page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireAuthCookie(request);
  if (userId) {
    throw redirect("/home");
  }
  return userId;
};

export default function Index() {
  return (
    <PageLayout>
      <div>Index Route</div>
    </PageLayout>
  );
}
