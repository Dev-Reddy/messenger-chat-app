import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "sunset",
  setTheme: (theme) => {
    console.log(theme);
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
