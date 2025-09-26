"use client";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryProvider } from "@/providers/QueryProvider";

export function Providers({ children }: { children: any }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </PersistGate>
    </Provider>
  );
}
