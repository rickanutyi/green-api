import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "shared/hooks/auth";

type PrivateRoteProps = {
    children: React.ReactNode;
};
function PrivateRoute({ children }: PrivateRoteProps) {
    const { user } = useAuth();
    return (
        <>
            {user ? (
                <React.Fragment>{children}</React.Fragment>
            ) : (
                <Navigate to="/auth" />
            )}
        </>
    );
}

export default PrivateRoute;
