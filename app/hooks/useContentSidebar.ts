import { create } from "zustand";

interface ContentSidebarStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useContentSidebar = create<ContentSidebarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useContentSidebar;
