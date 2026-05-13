import { AuthAction, AuthActionType, AuthState } from "./actions";

export const initialAuthState: AuthState = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };

    case AuthActionType.LOGOUT:
      return {
        ...initialAuthState,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;