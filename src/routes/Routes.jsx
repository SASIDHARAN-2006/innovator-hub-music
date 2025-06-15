import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgetPass from "../auth/ForgetPass";
import UserLayout from "../components/user/UserLayout";
import UserAccount from "../components/user/UserAccount";
import UpdateProfile from "../components/user/UpdateProfile";
import UpdatePassword from "../components/user/UpdatePassword";
import UpdatePicture from "../components/user/UpdatePicture";
import DeleteAccount from "../components/user/DeleteAccount";
import AdminLayout from "../admin/AdminLayout";
import AdminDashboard from "../admin/AdminDashboard";
import AddAlbum from "../admin/AddAlbum";
import Dashboard from "../components/home/Dashboard";
import AlbumDetails from "../components/home/AlbumDetails";
import PublicRoutes from "./PublicRoutes";
import PageNotFound from "../pages/PageNotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoutes from "./AdminRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "album-details",
            element: <AlbumDetails />,
          },
        ],
      },
      {
        path: "auth/login",
        element: (
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        ),
      },
      {
        path: "auth/register",
        element: (
          <PublicRoutes>
            <Register />
          </PublicRoutes>
        ),
      },
      {
        path: "auth/forget-password",
        element: (
          <PublicRoutes>
            <ForgetPass />
          </PublicRoutes>
        ),
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoutes>
            <AdminRoutes>
              <AdminLayout />
            </AdminRoutes>
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoutes>
                <AdminRoutes>
                  <AdminDashboard />
                </AdminRoutes>
              </ProtectedRoutes>
            ),
          },
          {
            path: "add-album",
            element: (
              <ProtectedRoutes>
                <AdminRoutes>
                  <AddAlbum />
                </AdminRoutes>
              </ProtectedRoutes>
            ),
          },
        ],
      },

      {
        path: "user-profile",
        element: (
          <ProtectedRoutes>
            <UserLayout />
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoutes>
                <UserAccount />
              </ProtectedRoutes>
            ),
          },
          {
            path: "update-picture",
            element: (
              <ProtectedRoutes>
                <UpdatePicture />
              </ProtectedRoutes>
            ),
          },
          {
            path: "update-profile",
            element: (
              <ProtectedRoutes>
                <UpdateProfile />
              </ProtectedRoutes>
            ),
          },
          {
            path: "update-password",
            element: (
              <ProtectedRoutes>
                <UpdatePassword />
              </ProtectedRoutes>
            ),
          },
          {
            path: "user-account",
            element: (
              <ProtectedRoutes>
                <UserAccount />
              </ProtectedRoutes>
            ),
          },
          {
            path: "update-password",
            element: (
              <ProtectedRoutes>
                <UpdatePassword />
              </ProtectedRoutes>
            ),
          },
          {
            path: "delete-account",
            element: (
              <ProtectedRoutes>
                <DeleteAccount />
              </ProtectedRoutes>
            ),
          },
        ],
      },
    ],
  },
]);

export default routes;
