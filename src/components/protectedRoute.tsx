import { Navigate } from 'react-router-dom';
import { UserAuth } from '../contexts/Auth/Auth.context.tsx';

const ProtectedRoute = ({ children }:any) => {
    const { user } = UserAuth();

    if (!user) {
        return <Navigate to='/' />;
    }
    return children;
};

export default ProtectedRoute;
