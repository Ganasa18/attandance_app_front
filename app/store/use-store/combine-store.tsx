/* eslint-disable import/no-unresolved */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createGlobalSlice } from "../reducer/global";
import { createTableSlice } from "../reducer/table";
import { GlobalSliceInterface, TableSliceInterface } from "~/interface";

export const STORAGE_KEY = "combine-storage";
type State = GlobalSliceInterface & TableSliceInterface;
const useCombinedStore = create<State>()(
  persist(
    devtools(
      (...a) => {
        return {
          ...createGlobalSlice(...a),
          ...createTableSlice(...a),
        };
      },
      { name: "global-persist" }
    ),
    {
      name: STORAGE_KEY,
    }
  )
);

export { useCombinedStore };
