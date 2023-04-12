import { Link } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";

function Header() {
    const [isLogin, setIsLogin] = useState(true);
    const getToken = localStorage.getItem("TOKEN");

    useEffect(() => {
        const token = localStorage.getItem("TOKEN");
        if (token) {
            setIsLogin(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("TOKEN");
        setIsLogin(true);
    };
    return (
        <div className="header">
            <div className="header__wrap width">
                <div className="logo">
                    <div className="logo__pre"></div>
                    <div className="logo__second"></div>
                </div>
                <div className="header__nav">
                    {isLogin ? (
                        <Link
                            to={"/login"}
                            onClick={() => setIsLogin(false)}
                            className="btn--m signin"
                        >
                            Sign In
                        </Link>
                    ) : (
                        <div className="header__profile">
                            <Link
                                to={"/profile"}
                                className="btn--m profile__btn"
                            >
                                Profile
                            </Link>
                            <Link
                                onClick={handleLogout}
                                className="btn--m logout__btn"
                            >
                                Log out
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
