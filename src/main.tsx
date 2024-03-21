import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { config } from "./config";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: config.map(({ element, path }) => ({ element, path })),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
