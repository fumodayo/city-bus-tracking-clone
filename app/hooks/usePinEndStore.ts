import { create } from "zustand";

interface PinEndStore {
  lat: number | null;
  lng: number | null;
  point: string;
  setlngLatEnd: (lat: number | null, lng: number | null) => void;
}

const usePinEndStore = create<PinEndStore>((set) => ({
  lat: null,
  lng: null,
  point: "end",
  setlngLatEnd: (lat, lng) => set({ point: "end", lat, lng }),
}));

export default usePinEndStore;
