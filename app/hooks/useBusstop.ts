import { create } from "zustand";
import { SafeStations } from "../components/types";

interface BusStopStore {
  busstopStore: Array<SafeStations>;
  setBusStopStore: (newStore: Array<SafeStations>) => void;
}

const useBusStopStore = create<BusStopStore>((set, get) => ({
  busstopStore: [],
  setBusStopStore: (newStore: Array<SafeStations>) => {
    set({ busstopStore: newStore });
  },
}));

export default useBusStopStore;
