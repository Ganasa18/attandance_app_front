/* eslint-disable import/no-unresolved */
import { Link, useMatches } from "@remix-run/react";
import { FaChevronDown } from "react-icons/fa6/index.js";
import { useEffectOnce } from "~/hook/use_effect_once";
import { TypeStoreStorage } from "~/interface/interface_store";
import { MenuItem } from "~/interface/menu_interface";
import { setLocalStorage, transformMenuStructure } from "~/lib/utils";
import { useCombinedStore } from "~/store/use-store/combine-store";
import MainSidebar from "./sidebar";

const dummyMenu: MenuItem[] = [
  {
    id: 1,
    menu_name: "dashboard",
    title_menu: "Dashboard",
    path: "/home",
    is_submenu: false,
    parent_name: "",
  },
  {
    id: 2,
    menu_name: "master_data",
    title_menu: "Master Data",
    path: "/master",
    is_submenu: false,
    parent_name: "",
  },
  {
    id: 3,
    menu_name: "master_role",
    title_menu: "Roles",
    path: "/master/role",
    is_submenu: true,
    parent_name: "master_data",
  },
  {
    id: 4,
    menu_name: "master_menu",
    title_menu: "Menus",
    path: "/master/menu",
    is_submenu: true,
    parent_name: "master_data",
  },
  {
    id: 5,
    menu_name: "user_management",
    title_menu: "Managment User",
    path: "/management",
    is_submenu: false,
    parent_name: "",
  },
  {
    id: 6,
    menu_name: "user_database",
    title_menu: "Database Users",
    path: "/management/users",
    is_submenu: true,
    parent_name: "user_management",
  },
  {
    id: 7,
    menu_name: "user_roles",
    title_menu: "User Roles",
    path: "/management/roles",
    is_submenu: true,
    parent_name: "user_management",
  },
];

const LayoutSidebar = () => {
  const transformedMenu = transformMenuStructure(dummyMenu);
  const matches = useMatches();
  const pathname = matches[1].pathname;
  const { activeIndexNav, setActiveIndexNav } = useCombinedStore();

  const toggleSubMenu = (index: number) => {
    setActiveIndexNav(index === activeIndexNav ? 0 : index);
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      toggleSubMenu(index);
    }
  };

  useEffectOnce(() => {
    setLocalStorage(TypeStoreStorage.LOCAL_USER_MENU, transformedMenu);
  });

  return (
    <MainSidebar>
      {transformedMenu.map((menu, index) => (
        <div key={index} className="space-y-10">
          <ul className="my-2">
            {menu && menu.submenu && menu.submenu.length > 0 ? (
              <li>
                <div
                  key={index}
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleSubMenu(index)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  className={`flex items-center justify-between p-3 rounded-sm ${
                    menu.path &&
                    typeof menu.path === "string" &&
                    pathname.startsWith(menu.path)
                      ? "bg-slate-900 text-slate-50"
                      : ""
                  }  hover:bg-slate-900 hover:text-slate-50 cursor-pointer`}>
                  <div className="flex items-center">
                    <span>{menu.title_menu}</span>
                  </div>
                  <FaChevronDown
                    className={`h-4 w-4 ${
                      activeIndexNav === index ? "transform rotate-180" : ""
                    }`}
                  />
                </div>
                <ul
                  className={`ml-4 my-2 ${
                    activeIndexNav === index ? "" : "hidden"
                  }`}>
                  {menu.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link to={subItem.path!}>
                        <span
                          className={`p-2 my-1 hover:bg-gray-700 flex items-center ${
                            pathname === subItem.path
                              ? "bg-gray-700 text-slate-50"
                              : ""
                          }  hover:text-slate-50 cursor-pointer rounded-sm`}>
                          {subItem.title_menu}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li>
                <Link to={menu.path!}>
                  <div
                    className={`flex items-center justify-between p-3 ${
                      pathname == menu.path ? "bg-slate-900 text-slate-50" : ""
                    } rounded-sm hover:bg-slate-900 hover:rounded-sm hover:text-slate-50 cursor-pointer`}>
                    <div className="flex items-center">
                      <span>{menu.title_menu}</span>
                    </div>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      ))}
    </MainSidebar>
  );
};

export default LayoutSidebar;
