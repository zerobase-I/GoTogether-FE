import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RecoilRoot} from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Routes from "./routes";



async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browsers');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}




enableMocking().then(() => {
  const queryClient = new QueryClient();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <RecoilRoot>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Routes/>
        </QueryClientProvider>
      </React.StrictMode>
    </RecoilRoot>
  );
});