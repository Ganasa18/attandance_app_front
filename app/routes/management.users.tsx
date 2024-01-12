/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import PageLayout from "~/components/template/base/page_layout";
import { requireAuthCookie } from "~/lib/auth";
import DatabaseUsersPage from "~/page/database-user/database_user";

export const meta: MetaFunction = () => {
  return [
    { title: "User Database Page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireAuthCookie(request);
  return userId;
};

export default function ManagementUsers() {
  return (
    <PageLayout>
      <DatabaseUsersPage />
    </PageLayout>
  );
}
