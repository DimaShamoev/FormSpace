import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../admin/Dashboard";
import AdminsTable, { adminsLoader } from "../admin/pages/AdminsTable";
import Layout from "../components/Layout";
import ErrorPage from "../components/errors/ErrorPage";
import ProtectedRoute from "../components/pageProtectors/ProtectedRoute";
import ProtectedRouteAdmin from "../components/pageProtectors/ProtectedRouteAdmin";
import CreateTemplate from "../pages/CreateTemplate";
import EditTemplate from "../pages/EditTemplate";
import FillTemplate, { fillTemplateLoader } from "../pages/FillTemplate";
import Home, { templatesLoader } from "../pages/Home";
import Profile, { userLoader } from "../pages/Profile";
import SignUp from "../pages/SignUp";
import SingIn from "../pages/SingIn";
import TemplatePage, { templatePageLoader } from "../pages/TemplatePage";
import AdminLayout from "../admin/components/AdminLayout";
import TemplatesTable from "../admin/pages/TemplatesTable";
import UsersTable from "../admin/pages/UsersTable";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
                loader: templatesLoader
            },
            {
                path: "profile",
                element: <ProtectedRoute><Profile /></ProtectedRoute>,
                loader: userLoader,
            },
            {
                path: "create-template",
                element: <ProtectedRoute><CreateTemplate /></ProtectedRoute>,
            },
            {
                path: "fill-template/:id",
                element: <ProtectedRoute><FillTemplate /></ProtectedRoute>,
                loader: fillTemplateLoader,
            },
            {
                path: "template/:id",
                element: <TemplatePage />,
                loader: templatePageLoader,
            },
            {
                path: "edit-template/:templateId",
                element: <ProtectedRoute><EditTemplate /></ProtectedRoute>,
            },
            { 
                path: "authorization",
                element: <SingIn /> 
            },
            { 
                path: "registration",
                element: <SignUp /> 
            },
            {
                path: "admin",
                element: <ProtectedRouteAdmin><AdminLayout /></ProtectedRouteAdmin>,
                children: [
                    { 
                        path: '/admin', 
                        element: <Dashboard /> 
                    },
                    { 
                        path: "admins-list",
                        element: <AdminsTable />,
                        loader: adminsLoader
                    },
                    { 
                        path: "users-list",
                        element: <UsersTable />
                    },
                    { 
                        path: "templates-list",
                        element: <TemplatesTable />
                    },
                ],
            },
        ],
    },
]);