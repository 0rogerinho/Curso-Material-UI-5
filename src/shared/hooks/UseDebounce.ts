import React from 'react';

export const useDebounce = (delay = 300, notDelayTimeout = true) => {
  const debouncing = React.useRef<ReturnType<typeof setTimeout>>();
  const isFirstTime = React.useRef(notDelayTimeout);

  const debounce = React.useCallback(
    (func: () => void) => {
      if (isFirstTime.current) {
        isFirstTime.current = false;
        func();
      } else {
        if (debouncing.current) {
          clearTimeout(debouncing.current);
        }

        debouncing.current = setTimeout(() => func(), delay);
      }
    },
    [delay],
  );

  return { debounce };
};
