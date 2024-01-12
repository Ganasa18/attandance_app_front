/* eslint-disable import/no-unresolved */
import Paragraph from "~/components/ui/paragraph";
import { GiHamburgerMenu } from "react-icons/gi/index.js";
import { ActionPayloadGlobal, ActionTypes } from "~/interface/interface_store";
import { useStore } from "~/store/use-store/use_store";

const LayoutTopbar = () => {
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
    <div>
      <div className="w-full bg-slate-900 h-16 flex justify-between items-center px-8 text-white">
        <div className="flex space-x-2">
          <button
            onClick={() => handleActiveNav()}
            className={`${
              activeNav ? "hidden" : ""
            } px-2 py-2 hover:bg-slate-800`}>
            <GiHamburgerMenu className="text-xl" />
          </button>
          <Paragraph size="sm" className="mt-1">
            Dashboard Admin
          </Paragraph>
        </div>
        <div>Profile</div>
      </div>
      <div className="absolute right-6 top-[3.8rem] hidden">
        <ul className="mt-1 px-2 py-4 w-[10rem] bg-slate-800 text-white text-sm rounded-md space-y-5 ">
          <li className="hover:bg-slate-400 cursor-pointer px-2 rounded-md">
            Profile
          </li>
          <li className="hover:bg-slate-400 cursor-pointer px-2 rounded-md">
            Setting
          </li>
          <li className="hover:bg-slate-400 cursor-pointer px-2 rounded-md">
            Log Out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LayoutTopbar;
