import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router"; 
import { type AppDispatch } from "../redux_state_manegemet/store";
import { user_information_changer } from "../redux_state_manegemet/user_information";

import  "./login.css";
import { login_api } from "../keys/links";

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
      
            const response = await axios.post(login_api, {
                email: email,
                password: password,
            });

     
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
        <div className="loginPage">
            <div className="loginContainer">
                <h1 className="title">Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="inputGroup">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

              
                    {error && <p className="errorMessage">{error}</p>}

                    <button type="submit" className="loginButton" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <div className="linksContainer">
                 
                    <Link to="/forgot-password" className="link">Forgot Password?</Link>
                    <Link to="/signup" className="link">New User? Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;