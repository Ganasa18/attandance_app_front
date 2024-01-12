/* eslint-disable import/no-unresolved */
import * as React from "react";
import { GiHamburgerMenu } from "react-icons/gi/index.js";
import { ActionPayloadGlobal, ActionTypes } from "~/interface";
import { useStore } from "~/store/use-store/use_store";

const MainSidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useStore();
  const { activeNav } = state.globalReducer;
  type Dispatch = (action: ActionPayloadGlobal) => void;
  const typeDispatch: Dispatch = dispatch;

  const handleActiveNav = () => {
    typeDispatch({
      type: ActionTypes.SET_NAV_MENU,
      action: !activeNav,
    });
  };

  return (
    <aside
      className={`min-h-screen ease-in-out duration-300 ${
        !activeNav ? "w-0" : "sm:w-8/12 xl:w-1/5"
      } `}>
      <nav className="h-full flex flex-col bg-white border-r shadow-md">
        <div className="p-4 pb-2 space-x-2  flex justify-between items-center">
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
          M Attandance Dashboard
          <button
            onClick={() => handleActiveNav()}
            className={`${
              !activeNav ? "hidden" : ""
            } px-2 py-2 rounded-lg bg-gray-50 hover:bg-gray-100`}>
            <GiHamburgerMenu />
          </button>
        </div>
        <ul className={`mt-8 flex-1 px-3`}>{children}</ul>
      </nav>
    </aside>
  );
};

export default MainSidebar;
