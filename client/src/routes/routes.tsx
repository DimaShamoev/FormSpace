import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import ErrorPage from "../components/errors/ErrorPage";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import TemplatePage from "../pages/TemplatePage";
import Dashboard from "../admin/Dashboard";
import SignUp from "../pages/SignUp";
import SingIn from "../pages/SingIn";
import ProtectedRoute from "../components/pageProtectors/ProtectedRoute";
import ProtectedRouteAdmin from "../components/pageProtectors/ProtectedRouteAdmin";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <ProtectedRoute><Home /></ProtectedRoute>
            },
            {
                path: 'profile',
                element: <ProtectedRoute><Profile /></ProtectedRoute>
            },
            {
                path: 'template/:id',
                element: <ProtectedRoute><TemplatePage /></ProtectedRoute>
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