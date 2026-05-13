import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import LoginForm from "src/components/forms/LoginForm";
import AuthContext from "src/global-state/AuthContext";

const LoginPage: NextPage = () => {
    const { push } = useRouter();
    const context = useContext(AuthContext);

    useEffect(() => {
        if (context?.state.isAuthenticated) {
            push('/dashboard');
        }
    }, [context?.state])

    return (
        <LoginForm />
    )
}

export default LoginPage;