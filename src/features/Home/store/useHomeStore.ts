import { create } from 'zustand';

interface IPostGroupLocation {
  bottomLeftLat: number;
  bottomLeftLong: number;
  topRightLat: number;
  topRightLong: number;
}

interface IHomeStore {
  selectedGroup: IPostGroupLocation | null;
  isPostDrawerOpen: boolean;
  setPostGroup: (selectedGroup: IPostGroupLocation) => void;
  setPostDrawerOpen: () => void;
}

const useHomeStore = create<IHomeStore>((set) => ({
  selectedGroup: null,
  isPostDrawerOpen: false,
  setPostGroup: (selectedGroup) => set({ selectedGroup: selectedGroup }),
  setPostDrawerOpen: () =>
    set((state) => ({ isPostDrawerOpen: !state.isPostDrawerOpen })),
}));

export default useHomeStore;
