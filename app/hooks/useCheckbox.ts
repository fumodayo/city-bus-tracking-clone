import { create } from "zustand";

interface CheckboxStore {
  routeCodes: Array<string | number>;
  checkedCode: (code: string | number) => void;
}

const useCheckboxStore = create<CheckboxStore>((set, get) => ({
  routeCodes: [],
  checkedCode: (code: string | number) => {
    const routesCodes = get().routeCodes;
    if (routesCodes.includes(code)) {
      set({ routeCodes: routesCodes.filter((item) => item !== code) });
    } else {
      set({ routeCodes: [...routesCodes, code] });
    }
  },
}));

export default useCheckboxStore;
