import Link from "next/link";
import { useContext } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useRouter } from "next/router";

import AuthContext from "src/global-state/AuthContext";
import { AuthActionType } from "src/global-state/AuthContext/actions";

import { setAccessToken } from "src/lib/axios";
import { logout } from "src/lib/services/authService";

const Header = () => {
    const router = useRouter();

    const context = useContext(AuthContext);

    if (!context) return null;

    const { state, dispatch } = context;

    const handleLogout = async () => {
        try {
            await logout();
            setAccessToken(null);
            dispatch({
                type: AuthActionType.LOGOUT,
            });
            router.push("/login");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
            <Container>
                <Link
                    href="/"
                    style={{
                        color: "white",
                        textDecoration: "none",
                        fontWeight: 600,
                        fontSize: "1.2rem",
                    }}
                >
                    Event AI Assistant
                </Link>

                <div className="d-flex align-items-center gap-2">
                    {!router.pathname.includes('/login') && (
                        <>
                            {state.isAuthenticated ? (
                                <>
                                    <Link href="/dashboard">
                                        <Button variant="outline-light">
                                            Dashboard
                                        </Button>
                                    </Link>

                                    <Link href="/">
                                        <Button variant="outline-light">
                                            Chat
                                        </Button>
                                    </Link>

                                    <Button
                                        variant="danger"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <Link href="/login">
                                    <Button variant="primary">
                                        Login
                                    </Button>
                                </Link>
                            )}
                        </>
                    )
                    }
                </div>
            </Container>
        </Navbar>
    );
};

export default Header;