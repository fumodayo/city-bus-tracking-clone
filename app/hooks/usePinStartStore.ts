import { create } from "zustand";

interface PinStartStore {
  lat: number | null;
  lng: number | null;
  point: string;
  setlngLatStart: (lat: number, lng: number) => void;
}

const usePinStartStore = create<PinStartStore>((set) => ({
  lat: null,
  lng: null,
  point: "start",
  setlngLatStart: (lat, lng) => set({ point: "start", lat, lng }),
}));

export default usePinStartStore;
