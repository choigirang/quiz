import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

/** 2024/05/31 - all provider */
export default function WithProvider({ children }: React.PropsWithChildren) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
