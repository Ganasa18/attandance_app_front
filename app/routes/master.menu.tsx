/* eslint-disable import/no-unresolved */
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import MenuMasterPage from "~/common/menu-master/menu_master";
import PageLayout from "~/components/template/base/page_layout";
import { requireAuthCookie } from "~/lib/auth";
export const meta: MetaFunction = () => {
  return [
    { title: "Menu Page" },
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
      <MenuMasterPage />
    </PageLayout>
  );
}
