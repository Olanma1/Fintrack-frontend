import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const darkMode = ref(localStorage.getItem("darkMode") === "true");

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
    localStorage.setItem("darkMode", darkMode.value);
    document.documentElement.classList.toggle("dark", darkMode.value);
  };

  // initialize theme when store loads
  document.documentElement.classList.toggle("dark", darkMode.value);

  return { darkMode, toggleDarkMode };
});
