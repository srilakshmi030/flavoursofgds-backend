import { useCallback, useEffect, useState } from 'react';

export function useApi(loader, deps = []) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const run = useCallback(() => {
    let active = true;
    setIsLoading(true);
    setError(null);

    loader()
      .then((result) => active && setData(result))
      .catch((err) => active && setError(err))
      .finally(() => active && setIsLoading(false));

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(run, [run]);

  return { data, error, isLoading };
}
