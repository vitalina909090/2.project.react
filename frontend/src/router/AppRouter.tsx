import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home";
import Articles from "../pages/Articles";
import Products from "../pages/Products";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/articles',
                element: <Articles />
            },
            {
                path: '/products',
                element: <Products />
            }
        ]
    }
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;