import "./index.css";
import React, { lazy, Suspense } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./components/Update";

const App = lazy(() => import("./App.jsx"));
const Users = lazy(() => import("./components/Users.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/users",
    element: <Users />,
    loader: () => fetch("http://localhost:5000/users"),
  },
  {
    path: "/update/:id",
    element: <Update />,
    loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`),
  },
]);

createRoot(document.getElementById("root")).render(
  <Suspense
    fallback={
      <img
        src="https://cdn.shopify.com/s/files/1/0600/7619/6092/files/Eclipse-1s-200px.gif?v=1638524141"
        alt="loading image"
      />
    }
  >
    <RouterProvider router={router} />
    <ToastContainer />
  </Suspense>
);
