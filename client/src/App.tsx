import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { routes } from "./routes";
import FallBack from "./components/FallBack";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<FallBack />}>
        <RouterProvider router={createBrowserRouter(routes)} />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
