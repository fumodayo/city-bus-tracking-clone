import { create } from "zustand";

interface FlyToStore {
  lat: number | null;
  lng: number | null;
  setCoordinates: (lat: number, lng: number) => void;
}

const useFlyToStore = create<FlyToStore>((set) => ({
  lat: null,
  lng: null,
  setCoordinates: (lat, lng) => set({ lat, lng }),
}));

export default useFlyToStore;
