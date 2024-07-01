import { useEffect, useState } from 'react';

/*
 * Error when using 'typeof window' in condition
 * https://stackoverflow.com/questions/71706064/
 *
 * Error Hydrating error
 * https://github.com/vercel/next.js/discussions/38263
 * https://stackoverflow.com/questions/75726866/
 */
export function useClientReady() {
  const [clientReady, setClientReady] = useState<boolean>(false);
  useEffect(() => void setClientReady(true), []);
  return clientReady;
}
