import { create } from 'zustand';

interface INotificationStore {
  newNotification: boolean;
  setNewNotification: (val: boolean) => void;
}

export const useNotificationStore = create<INotificationStore>((set) => ({
  newNotification: false,
  setNewNotification: (val) => set({ newNotification: val }),
}));
