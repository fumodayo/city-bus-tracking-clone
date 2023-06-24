import { create } from "zustand";
import { SafeStations } from "../components/types";

interface BusStopStore {
  busstopStore: Array<SafeStations>;
  direction: string;
  code: string;
  setBusStopStore: (newStore: Array<SafeStations>) => void;
  setCode: (newCode: string) => void;
  setDirection: (newCode: string) => void;
}

const useBusStopStore = create<BusStopStore>((set, get) => ({
  busstopStore: [],
  setBusStopStore: (newStore: Array<SafeStations>) => {
    set({ busstopStore: newStore });
  },
  direction: "turn",
  code: "",
  listingBusStopStore: [],
  setDirection: (newState: string) => {
    set({ direction: newState });
  },
  setCode: (newState: string) => {
    set({ code: newState });
  },
}));

export default useBusStopStore;
