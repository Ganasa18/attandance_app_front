/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateCreator } from "zustand";
import { GlobalInitInterface, GlobalSliceInterface } from "../../interface/";

const INIT_STATE_GLOBAL: Pick<GlobalInitInterface, keyof GlobalInitInterface> =
  {
    loading: true,
    activeNav: true,
    activeIndexNav: 0,
    token: "",
  };

const createGlobalSlice: StateCreator<
  GlobalSliceInterface,
  [],
  [],
  GlobalSliceInterface
> = (set) => ({
  ...INIT_STATE_GLOBAL,
  setLoading: () => set((state) => ({ loading: !state.loading })),
  setActiveNav: () => set((state) => ({ activeNav: !state.activeNav })),
  setActiveIndexNav: (activeIndexNav) => {
    return set({ activeIndexNav: activeIndexNav });
  },
  setTokenUser: (token: string) => set({ token: token }),
});

export { createGlobalSlice };
