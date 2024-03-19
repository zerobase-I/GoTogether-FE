// mocks/startMSW.ts
import { setupWorker } from 'msw';

import { MSW_STATUS } from './constants';

export function startMSW(
  worker: ReturnType<typeof setupWorker>,
): ReturnType<typeof worker.start> {
  const start = (): ReturnType<typeof worker.start> => {
    return worker.start();
  };

  const mocks = {
    start: () => start().then(() => localStorage.setItem(MSW_STATUS, 'true')),
    stop: () => {
      worker.stop();
      localStorage.setItem(MSW_STATUS, 'false');
    },
  };
  (window as any).mocks = mocks;

  return start();
}
