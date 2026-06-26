'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

function useHasMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useHasMounted();

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="fixed bottom-20 right-6 z-40 w-11 h-11 rounded-full bg-gold-800 dark:bg-gray-800 border border-gold-700/40 dark:border-gold-600/30 text-white dark:text-gold-400 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group"
    >
      <Sun
        className={`w-5 h-5 absolute transition-all duration-500 ${
          isDark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
        }`}
      />
      <Moon
        className={`w-5 h-5 absolute transition-all duration-500 ${
          isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
      />
    </button>
  );
}