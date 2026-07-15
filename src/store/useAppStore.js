import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set) => ({
      // State
      theme: "dark",
      savedCareers: [],
      suggestedCategory: "All",

      // Actions
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === "dark" ? "light" : "dark";
          if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          return { theme: newTheme };
        }),

      toggleSavedCareer: (title) =>
        set((state) => {
          const isSaved = state.savedCareers.includes(title);
          if (isSaved) {
            return {
              savedCareers: state.savedCareers.filter((t) => t !== title),
            };
          } else {
            return { savedCareers: [...state.savedCareers, title] };
          }
        }),

      setSuggestedCategory: (category) => set({ suggestedCategory: category }),
    }),
    {
      name: "technav-storage",
    },
  ),
);
