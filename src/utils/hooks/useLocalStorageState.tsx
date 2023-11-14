import { Dispatch, SetStateAction, useEffect, useState } from 'react';
// types

function useLocalStorageState<ValueType>(defaultValue: ValueType, key: string): [ValueType, Dispatch<SetStateAction<ValueType>>] {
  const [value, setValue] = useState<ValueType>(() => {
    // NOTE: this is required as window is not definied in SSR stage
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    const LocalStorageValue = window.localStorage.getItem(key);
    return LocalStorageValue !== null ? JSON.parse(LocalStorageValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorageState;
