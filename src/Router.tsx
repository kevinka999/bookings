import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home, Manage, Booking } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/bookings",
    element: <Manage />,
  },
  {
    path: "/booking/:id",
    element: <Booking />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
