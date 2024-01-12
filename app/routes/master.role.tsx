/* eslint-disable import/no-unresolved */
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import PageLayout from "~/components/template/base/page_layout";
import { requireAuthCookie } from "~/lib/auth";
import RoleMasterPage from "~/page/role-master/role_master";
export const meta: MetaFunction = () => {
  return [
    { title: "Role Page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireAuthCookie(request);
  return userId;
};

export default function MasterRole() {
  return (
    <PageLayout>
      <RoleMasterPage />
    </PageLayout>
  );
}
