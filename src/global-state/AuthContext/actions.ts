import { Dispatch } from "react";

export interface User {
  id: string;
  email: string;
  role: string;
}

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export enum AuthActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export type AuthAction =
  | {
      type: AuthActionType.LOGIN;
      payload: {
        accessToken: string;
        user: User;
      };
    }
  | {
      type: AuthActionType.LOGOUT;
    };
