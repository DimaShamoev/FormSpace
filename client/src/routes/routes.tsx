import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import ErrorPage from "../components/errors/ErrorPage";
import Home, { templatesLoader } from "../pages/Home";
import Profile, { userLoader } from "../pages/Profile";
import TemplatePage, { templatePageLoader } from "../pages/TemplatePage";
import Dashboard from "../admin/Dashboard";
import SignUp from "../pages/SignUp";
import SingIn from "../pages/SingIn";
import ProtectedRoute from "../components/pageProtectors/ProtectedRoute";
import ProtectedRouteAdmin from "../components/pageProtectors/ProtectedRouteAdmin";
import CreateTemplate from "../pages/CreateTemplate";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
                loader: templatesLoader
            },
            {
                path: 'profile',
                element: <ProtectedRoute><Profile /></ProtectedRoute>,
                loader: userLoader
            },
            {
                path: 'create-template',
                element: <ProtectedRoute><CreateTemplate /></ProtectedRoute>
            },
            {
                path: 'fill-template/:id',
            },
            {
                path: 'template/:id',
                element: <TemplatePage />,
                loader: templatePageLoader

            },
            {
                path: 'edit-template/:id'
            },
            {
                path: "authorization",
                element: <SingIn />
            },
            {
                path: 'registration',
                element: <SignUp />   
            },
            {
                path: 'admin',
                element: <ProtectedRouteAdmin><Dashboard /></ProtectedRouteAdmin>
            }

        ]
    }
])