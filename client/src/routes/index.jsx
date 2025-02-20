import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes';

const router = createBrowserRouter([
    {
        path:"/login",
        element: <h1>Login page</h1>,
    },
    {
       path: "/register",
       element: <h1>Register page</h1> 
    },
    {
        path: "/",
        element: <ProtectedRoute/>,
        children: [
            {
                element: <h1>Movies Listing Page</h1>,
                index: true
            },
            {
                element: <h1>Movies detail page</h1>,
                path: "/movies/:id"
            },
        ],
    },
]);

function AppRouter() {
    return <RouterProvider route={router} />;
}
export default AppRouter;