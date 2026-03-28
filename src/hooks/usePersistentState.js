import { useEffect, useState } from 'react';

export default function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error(`Unable to read ${key} from localStorage`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Unable to write ${key} to localStorage`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
