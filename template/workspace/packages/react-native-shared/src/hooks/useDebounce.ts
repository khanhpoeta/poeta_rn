import {useEffect, useState} from 'react';

export default <T>(value: T, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, value]);

  return debouncedValue;
};
