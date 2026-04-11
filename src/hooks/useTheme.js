import { useEffect, useState } from 'react';

const THEME_KEY = 'theme';

const getSavedTheme = () => {
  if (typeof window === 'undefined') return 'light';

  const storedTheme = localStorage.getItem(THEME_KEY);
  return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'light';
};

export default function useTheme() {
  const getInitialTheme = () => {
    return getSavedTheme();
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === 'dark';

    root.classList.toggle('dark', isDark);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('theme-change', { detail: theme }));
    }
  }, [theme]);

  useEffect(() => {
    const handleThemeChange = (event) => {
      const nextTheme = event.detail;
      if (nextTheme === 'light' || nextTheme === 'dark') {
        setTheme(nextTheme);
      }
    };

    const handleStorage = (event) => {
      if (event.key === THEME_KEY && (event.newValue === 'light' || event.newValue === 'dark')) {
        setTheme(event.newValue);
      }
    };

    window.addEventListener('theme-change', handleThemeChange);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('theme-change', handleThemeChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, nextTheme);
      return nextTheme;
    });
  };

  return { theme, isDark: theme === 'dark', setTheme, toggleTheme };
}
