import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

type Notification = {
  type: "error" | "success" | "info";
  message: string;
  id: string;
};

type NewNotification = {
  type: "error" | "success" | "info";
  message: string;
};

type NotificationStore = {
  notifications: Notification[];
  notify: (notification: NewNotification) => void;
  popNotification: () => void;
};

const notificationsStore = create<NotificationStore>((set) => ({
  notifications: [],
  notify: (notification: NewNotification) => {
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: uuidv4() },
      ],
    }));
  },
  popNotification: () => {
    set((state) => ({
      notifications: state.notifications.slice(1),
    }));
  },
}));

export default notificationsStore;
