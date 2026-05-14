import { createContext, Dispatch, useEffect, useReducer } from "react";
import authReducer, { initialAuthState } from "./reducer";
import { AuthAction, AuthActionType, AuthState } from "./actions";
import axiosClient, { setAccessToken } from "src/lib/axios";

interface IAuthContext {
    state: AuthState;
    dispatch: Dispatch<AuthAction>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: {
    children: React.ReactNode;
}) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const res: any = await axiosClient.post("/auth/refresh");
                setAccessToken(res.data.accessToken);
                dispatch({
                    type: AuthActionType.LOGIN,
                    payload: {
                        accessToken: res.data.accessToken,
                        user: res.data.user,
                    },
                });
            } catch {
                dispatch({
                    type: AuthActionType.LOGOUT,
                });
            }
        };
        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;