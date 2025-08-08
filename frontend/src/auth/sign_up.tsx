import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import { type AppDispatch } from "../redux_state_manegemet/store";
import { user_information_changer } from "../redux_state_manegemet/user_information";


import styles from "./SignUp.module.css";
import { sign_up_api } from "../keys/links";

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault(); 
        setLoading(true);
        setError(null);

        try {
    
            const response = await axios.post(sign_up_api, {
                name: name,
                email: email,
                password: password,
            });

         
            const { token, user } = response.data;

            if (token && user) {
   
                localStorage.setItem("authToken", token);

       
                dispatch(user_information_changer(user));

                navigate("/dashboard");
            } else {
                setError("Account created, but failed to log in automatically.");
            }

        } catch (err: any) {
       
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className={styles.signUpPage}>
            <div className={styles.signUpContainer}>
                <h1 className={styles.title}>Create Account</h1>
                <form onSubmit={handleSignUp}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.inputGroup}>
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
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

    
                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <button type="submit" className={styles.signUpButton} disabled={loading}>
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>
                <div className={styles.linksContainer}>
                    <p>Already have an account?</p>
                    <Link to="/login" className={styles.link}>Login Here</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;