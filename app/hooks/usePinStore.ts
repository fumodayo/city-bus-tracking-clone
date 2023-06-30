import { create } from "zustand";

interface PinStore {
  start: {
    lat: number | null;
    lng: number | null;
    setLngLatStart: (lat: number, lng: number) => void;
    resetLatLngStart: () => void;
  };
  end: {
    lat: number | null;
    lng: number | null;
    setLngLatEnd: (lat: number | null, lng: number | null) => void;
    resetLatLngEnd: () => void;
  };
}

const usePinStore = create<PinStore>((set) => ({
  start: {
    lat: null,
    lng: null,
    setLngLatStart: (lat, lng) =>
      set((state) => ({ start: { ...state.start, lat, lng } })),
    resetLatLngStart: () =>
      set((state) => ({ start: { ...state.start, lat: null, lng: null } })),
  },
  end: {
    lat: null,
    lng: null,
    setLngLatEnd: (lat, lng) =>
      set((state) => ({ end: { ...state.end, lat, lng } })),
    resetLatLngEnd: () =>
      set((state) => ({ end: { ...state.end, lat: null, lng: null } })),
  },
}));

export default usePinStore;
