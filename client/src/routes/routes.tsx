import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "../components/Layout";
import ErrorPage from "../components/errors/ErrorPage";
import ProtectedRoute from "../components/pageProtectors/ProtectedRoute";
import ProtectedRouteAdmin from "../components/pageProtectors/ProtectedRouteAdmin";
import WithSuspense from "../components/loading/WithSuspense";

const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const CreateTemplate = lazy(() => import("../pages/CreateTemplate"));
const EditTemplate = lazy(() => import("../pages/EditTemplate"));
const FillTemplate = lazy(() => import("../pages/FillTemplate"));
const EditTemplateResponse = lazy(() => import("../pages/EditTemplateResponse"));
const TemplatePage = lazy(() => import("../pages/TemplatePage"));
const SignUp = lazy(() => import("../pages/SignUp"));
const SingIn = lazy(() => import("../pages/SingIn"));
const Dashboard = lazy(() => import("../admin/Dashboard"));
const AdminLayout = lazy(() => import("../admin/components/AdminLayout"));
const AdminsTable = lazy(() => import("../admin/pages/AdminsTable"));
const UsersTable = lazy(() => import("../admin/pages/UsersTable"));
const TemplatesTable = lazy(() => import("../admin/pages/TemplatesTable"));
const ResponsesTable = lazy(() => import("../admin/pages/ResponsesTable"));
const CommentsTable = lazy(() => import("../admin/pages/CommentsTable"));

import { templatesLoader } from "../pages/Home";
import { userLoader } from "../pages/Profile";
import { fillTemplateLoader } from "../pages/FillTemplate";
import { templatePageLoader } from "../pages/TemplatePage";
import { editTemplateResponseLoader } from "../pages/EditTemplateResponse";
import { adminsLoader } from "../admin/pages/AdminsTable";
import { usersLoaderAdmin } from "../admin/pages/UsersTable";
import { templatesLoaderAdmin } from "../admin/pages/TemplatesTable";
import { responsesLoaderAdmin } from "../admin/pages/ResponsesTable";
import { CommentsLoaderAdmin } from "../admin/pages/CommentsTable";
import SalesforceForm from "../pages/SalesforceForm";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <WithSuspense>
            <Home />
          </WithSuspense>
        ),
        loader: templatesLoader,
      },
      {
        path:'salesforce',
        element: (
            <WithSuspense>
                <ProtectedRoute>
                    <SalesforceForm />
                </ProtectedRoute>
            </WithSuspense>
        )
      },
      {
        path: "profile",
        element: (
          <WithSuspense>
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          </WithSuspense>
        ),
        loader: userLoader,
      },
      {
        path: "create-template",
        element: (
          <WithSuspense>
            <ProtectedRoute>
              <CreateTemplate />
            </ProtectedRoute>
          </WithSuspense>
        ),
      },
      {
        path: "fill-template/:id",
        element: (
          <WithSuspense>
            <ProtectedRoute>
              <FillTemplate />
            </ProtectedRoute>
          </WithSuspense>
        ),
        loader: fillTemplateLoader,
      },
      {
        path: "template/:templateId/edit-filled-template/:responseId",
        element: (
          <WithSuspense>
            <ProtectedRoute>
              <EditTemplateResponse />
            </ProtectedRoute>
          </WithSuspense>
        ),
        loader: editTemplateResponseLoader,
      },
      {
        path: "template/:id",
        element: (
          <WithSuspense>
            <TemplatePage />
          </WithSuspense>
        ),
        loader: templatePageLoader,
      },
      {
        path: "edit-template/:templateId",
        element: (
          <WithSuspense>
            <ProtectedRoute>
              <EditTemplate />
            </ProtectedRoute>
          </WithSuspense>
        ),
      },
      {
        path: "authorization",
        element: (
          <WithSuspense>
            <SingIn />
          </WithSuspense>
        ),
      },
      {
        path: "registration",
        element: (
          <WithSuspense>
            <SignUp />
          </WithSuspense>
        ),
      },
      {
        path: "admin",
        element: (
          <WithSuspense>
            <ProtectedRouteAdmin>
              <AdminLayout />
            </ProtectedRouteAdmin>
          </WithSuspense>
        ),
        children: [
          {
            path: "/admin",
            element: (
              <WithSuspense>
                <Dashboard />
              </WithSuspense>
            ),
          },
          {
            path: "admins-list",
            element: (
              <WithSuspense>
                <AdminsTable />
              </WithSuspense>
            ),
            loader: adminsLoader,
          },
          {
            path: "users-list",
            element: (
              <WithSuspense>
                <UsersTable />
              </WithSuspense>
            ),
            loader: usersLoaderAdmin,
          },
          {
            path: "templates-list",
            element: (
              <WithSuspense>
                <TemplatesTable />
              </WithSuspense>
            ),
            loader: templatesLoaderAdmin,
          },
          {
            path: "responses-list",
            element: (
              <WithSuspense>
                <ResponsesTable />
              </WithSuspense>
            ),
            loader: responsesLoaderAdmin,
          },
          {
            path: "comments-list",
            element: (
              <WithSuspense>
                <CommentsTable />
              </WithSuspense>
            ),
            loader: CommentsLoaderAdmin,
          },
        ],
      },
    ],
  },
]);
