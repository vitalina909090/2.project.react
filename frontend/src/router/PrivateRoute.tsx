import useAuth from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const { isAuth, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>
    }

    return isAuth ? <Outlet /> : <Navigate to="/login" />
};

export default PrivateRoute;