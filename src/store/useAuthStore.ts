import { create } from 'zustand';

export interface IUserState {
  user: {
    userId: string;
    userName: string;
    email: string;
    isNewUser: boolean;
    picture?: string;
  } | null;
}

interface IUserStore extends IUserState {
  setUser: (user: IUserState) => void;
  removeUser: () => void;
  // setTestUser: () => void;
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
  // setTestUser: () => {
  //   set({
  //     user: {
  //       userId: '9',
  //       userName: 'test',
  //       email: 'qwer@qwer.com',
  //       isNewUser: false,
  //     },
  //   });
  // },
}));

export default useAuthStore;
