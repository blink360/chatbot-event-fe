import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "src/global-state/AuthContext";
import { Spinner } from "react-bootstrap";

const withProtectedRoute = (Component: any) => {
  const ProtectedComponent = (props: any) => {
    const context = useContext(AuthContext);

    if (!context) {
      throw new Error("AuthContext not found");
    }

    const { state } = context;
    const router = useRouter();

    useEffect(() => {
      if (!state.isLoading && !state.isAuthenticated) {
        router.replace("/login");
      }
    }, [state.isLoading, state.isAuthenticated, router]);

    if (state.isLoading || !state.isAuthenticated) {
      return (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" />
        </div>
      );
    }

    return <Component {...props} />;
  };

  return ProtectedComponent;
};

export default withProtectedRoute;