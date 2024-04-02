import { create } from 'zustand';

interface IHomeStore {
  selectedPostId: number | null;
  isPostDrawerOpen: boolean;
  setPostId: (postId: number) => void;
  setPostDrawerOpen: () => void;
}

const useHomeStore = create<IHomeStore>((set) => ({
  selectedPostId: null,
  isPostDrawerOpen: false,
  setPostId: (postId) => set({ selectedPostId: postId }),
  setPostDrawerOpen: () =>
    set((state) => ({ isPostDrawerOpen: !state.isPostDrawerOpen })),
}));

export default useHomeStore;
