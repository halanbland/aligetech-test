import { Link } from "react-router-dom";
import "./Login.css";
import { useEffect, useState } from "react";
import { UseLogin } from "../../apis";
import { useNavigate } from "react-router-dom";

function Login() {
    const [data, setData] = useState();
    const [input, setInput] = useState();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const res = await UseLogin(input);
        if (res.data.code !== 401) {
            localStorage.setItem("TOKEN", res.data.accessToken);
            navigate("/");
        }
    };

    return (
        <div className="login">
            <div className="width">
                <div className="logo login__logo">
                    <div className="logo__pre"></div>
                    <div className="logo__second"></div>
                </div>
            </div>
            <div className="login__modal">
                <div className="login__content">
                    <h1 className="login__content-header">Sign in</h1>
                    <p className="login__content-title">User name</p>
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        className="login__input"
                    />
                    <button className="btn--l" onClick={handleLogin}>
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
