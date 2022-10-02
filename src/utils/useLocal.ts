import React from 'react';

export const useLocal = <T>(creator: () => T): T => {
  const container = React.useRef<T | null>(null);

  if (container.current === null) {
    container.current = creator();
  }

  return container.current;
};
