/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import DashboardPage from "~/common/dashboard/dashboard";
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
  return userId;
};

export default function Index() {
  return (
    <PageLayout>
      <DashboardPage />
    </PageLayout>
  );
}
