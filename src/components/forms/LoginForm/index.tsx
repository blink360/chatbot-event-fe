import { useForm } from "react-hook-form";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import axiosClient, { setAccessToken } from "src/lib/axios";
import { useContext } from "react";
import AuthContext from "src/global-state/AuthContext";
import { AuthActionType } from "src/global-state/AuthContext/actions";
import { useRouter } from "next/router";
import { login } from "src/lib/services/authService";

type LoginFormInputs = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const {
        register,
        handleSubmit,
    } = useForm<LoginFormInputs>();

    const { push } = useRouter();
    const context = useContext(AuthContext);
    const dispatch = context ? context.dispatch : undefined;

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data: any) => {
            setAccessToken(data.accessToken);
            dispatch && dispatch({
                type: AuthActionType.LOGIN,
                payload: {
                    accessToken: data.accessToken,
                    user: data.user,
                },
            });
            push("/dashboard");
        },

        onError: (err) => {
            console.error("Login failed", err);
        },
    });

    return (
        <Card className="p-4 shadow-sm">
            <h3 className="mb-3 text-center">Login</h3>

            <Form onSubmit={handleSubmit((data: any) => mutation.mutate(data))}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        {...register("email", {
                            required: true,
                        })}
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        {...register("password", {
                            required: true,
                        })}
                    />
                </Form.Group>

                <Button
                    type="submit"
                    variant="primary"
                    className="w-100"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? (
                        <>
                            <Spinner
                                size="sm"
                                animation="border"
                                className="me-2"
                            />
                            Logging in...
                        </>
                    ) : (
                        "Login"
                    )}
                </Button>
            </Form>
        </Card>
    );
};

export default LoginForm;