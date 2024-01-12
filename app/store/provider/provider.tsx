import { useReducer, type FC, type ReactNode, useMemo } from "react";
import Context from "../context/context";
import combineReducers, { InitState } from "..";
import { globalReducer, tableReducer } from "../reducer";

interface ProvidersProps {
  children: ReactNode;
}

const rootReducer = combineReducers({
  globalReducer,
  tableReducer,
});

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, InitState);
  const store = useMemo(() => [state, dispatch], [state]);

  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export default Providers;
