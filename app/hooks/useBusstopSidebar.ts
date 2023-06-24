import { create } from "zustand";

interface BusstopSidebarStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useBusstopSidebar = create<BusstopSidebarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useBusstopSidebar;
