import { create } from "zustand";
import { SafeRoutes } from "../components/types";

interface BusRouteStore {
  busRouteStore: Array<SafeRoutes>;
  setBusRouteStore: (newStore: Array<SafeRoutes>) => void;
}

const useBusRouteStore = create<BusRouteStore>((set, get) => ({
  busRouteStore: [],
  setBusRouteStore: (newStore: Array<SafeRoutes>) => {
    set({ busRouteStore: newStore });
  },
}));

export default useBusRouteStore;
