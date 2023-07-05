import { create } from "zustand";

interface CheckboxStore {
  routeCodes: Array<string>;
  checkedCode: (code: string) => void;
  resetCheckedCode: () => void;
}

const useCheckboxStore = create<CheckboxStore>((set, get) => ({
  routeCodes: [],
  checkedCode: (code: string) => {
    const routesCodes = get().routeCodes;
    if (routesCodes.includes(code)) {
      set({ routeCodes: routesCodes.filter((item) => item !== code) });
    } else {
      set({ routeCodes: [...routesCodes, code] });
    }
  },
  resetCheckedCode: () => set({ routeCodes: [] }),
}));

export default useCheckboxStore;
