import { lazy } from "react";

const Application = lazy(() => import("./pages/Aplication"));
const NotFound = lazy(() => import("./pages/NotFound"));

export const routes = [
  {
    path: "/:search?",
    element: <Application />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
