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
  isMapMoved: boolean;
  setPostGroup: (selectedGroup: IPostGroupLocation) => void;
  setPostDrawerOpen: () => void;
  setIsMapMoved: (value: boolean) => void;
}

const useHomeStore = create<IHomeStore>((set) => ({
  selectedGroup: null,
  isPostDrawerOpen: false,
  isMapMoved: false,
  setPostGroup: (selectedGroup) => set({ selectedGroup: selectedGroup }),
  setPostDrawerOpen: () =>
    set((state) => ({ isPostDrawerOpen: !state.isPostDrawerOpen })),
  setIsMapMoved: (value) => set({ isMapMoved: value }),
}));

export default useHomeStore;
