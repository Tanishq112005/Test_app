import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import { FiMail, FiLock, FiLoader, FiAlertCircle } from 'react-icons/fi';

import { type AppDispatch } from "../redux_state_manegemet/store";
import { user_information_changer } from "../redux_state_manegemet/user_information";
import { login_api } from "../keys/links";

import "./login.css"; // Import the newly scoped CSS

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(login_api, { email, password });
            const { token, user } = response.data;

            if (token && user) {
                localStorage.setItem("authToken", token);
                dispatch(user_information_changer(user));
                navigate("/dashboard");
            } else {
                setError("Invalid response from server. Please try again.");
            }
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        // This top-level class is the key to scoping all our styles
        <div className="login-page">
            <div className="login-card">
                <div className="login-card__header">
                    <h1 className="login-card__logo">AlgoDojo</h1>
                    <p className="login-card__title">Welcome back! Please login to your account.</p>
                </div>

                <form onSubmit={handleLogin}>
                    {error && (
                        <div className="error-message">
                            <FiAlertCircle />
                            <span>{error}</span>
                        </div>
                    )}
                    
                    <div className="form-group">
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <FiMail className="input-icon" />
                    </div>
                    <div className="form-group">
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <FiLock className="input-icon" />
                    </div>

                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? (
                            <>
                                <FiLoader className="spinner" />
                                <span>Logging in...</span>
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>

                <div className="links-container">
                    <Link to="/signup" className="link">New User? Sign Up</Link>
                    <Link to="/forgot-password" className="link">Forgot Password?</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;