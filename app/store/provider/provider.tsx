// import { useMemo, useReducer, type FC, type ReactNode } from "react";
// import combineReducers, { InitState, RootReducer } from "..";
// import Context from "../context/context";
// import { tableReducer } from "../reducer";

// interface ProvidersProps {
//   children: ReactNode;
// }

// const rootReducer: RootReducer = {
//   tableReducer: tableReducer,
// };

// const Providers: FC<ProvidersProps> = ({ children }) => {
//   const [state, dispatch] = useReducer(combineReducers(rootReducer), InitState);
//   const store = useMemo(() => [state, dispatch], [state]);

//   return <Context.Provider value={store}>{children}</Context.Provider>;
// };

// export default Providers;
