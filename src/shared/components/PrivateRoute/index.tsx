import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return <div>Carregando...</div>;
    if (!isAuthenticated) return <Navigate to="/" replace />;

    return <>{children}</>;
}