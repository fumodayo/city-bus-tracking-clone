import { create } from "zustand";

interface RouteSidebarStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRouteSidebar = create<RouteSidebarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRouteSidebar;
