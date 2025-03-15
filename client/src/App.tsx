import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { routes } from "./routes";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>fallback</div>}>
        <RouterProvider router={createBrowserRouter(routes)} />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
