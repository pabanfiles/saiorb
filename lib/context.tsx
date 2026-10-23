"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Lang = "bn" | "en";
type Theme = "light" | "dark";

interface AppContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [theme, setThemeState] = useState<Theme>("light");
  useEffect(() => {
    queueMicrotask(() => {
      const savedLang = localStorage.getItem("saiorb_lang") as Lang;
      if (savedLang === "en") {
        setLangState(savedLang);
      } else {
        setLangState("en");
      }

      const savedTheme = localStorage.getItem("saiorb_theme") as Theme;
      if (savedTheme === "dark" || savedTheme === "light") {
        setThemeState(savedTheme);
        if (savedTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setThemeState("dark");
        document.documentElement.classList.add("dark");
      }
    });
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("saiorb_lang", newLang);
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setThemeState(next);
    localStorage.setItem("saiorb_theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <AppContext.Provider value={{ lang, setLang, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    // Provide safe default if used outside provider
    return {
      lang: "en" as Lang,
      setLang: () => {},
      theme: "light" as Theme,
      toggleTheme: () => {},
    };
  }
  return context;
}
