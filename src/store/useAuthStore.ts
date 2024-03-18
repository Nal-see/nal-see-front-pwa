import { create } from 'zustand';

interface IUserState {
  user: {
    userId: string;
    username: string;
    email: string;
    isNewUser: boolean;
  } | null;
}

interface IUserStore extends IUserState {
  setUser: (user: IUserState) => void;
  removeUser: () => void;
}

const initialState: IUserState = {
  user: null,
};

const useAuthStore = create<IUserStore>((set) => ({
  ...initialState,
  setUser: (user) => {
    set(user);
  },
  removeUser: () => set({ user: null }),
}));

export default useAuthStore;
