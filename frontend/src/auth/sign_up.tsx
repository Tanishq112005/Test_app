import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router"; // Use react-router-dom
import { FiUser, FiMail, FiLock, FiLoader, FiAlertCircle } from 'react-icons/fi';

import { type AppDispatch } from "../redux_state_manegemet/store";
import { user_information_changer } from "../redux_state_manegemet/user_information";
import { sign_up_api } from "../keys/links";

import styles from "./SignUp.module.css"; // Using CSS Modules

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
            const response = await axios.post(sign_up_api, { name, email, password });
            const { token, user } = response.data;

            if (token && user) {
                localStorage.setItem("authToken", token);
                dispatch(user_information_changer(user));
                navigate("/dashboard");
            } else {
                setError("Account created, but failed to log in automatically.");
            }
        } catch (err: any) {
            if (err.response?.data?.message) {
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
            <div className={styles.signUpCard}>
                <div className={styles.signUpCardHeader}>
                    <h1 className={styles.signUpCardLogo}>AlgoDojo</h1>
                    <p className={styles.signUpCardTitle}>Create an account to start your journey.</p>
                </div>

                <form onSubmit={handleSignUp}>
                    {error && (
                        <div className={styles.errorMessage}>
                            <FiAlertCircle />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <FiUser className={styles.inputIcon} />
                    </div>

                    <div className={styles.formGroup}>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <FiMail className={styles.inputIcon} />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <FiLock className={styles.inputIcon} />
                    </div>

                    <button type="submit" className={styles.btn} disabled={loading}>
                        {loading ? (
                            <>
                                <FiLoader className={styles.spinner} />
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>

                <div className={styles.linksContainer}>
                    <p>Already have an account?</p>
                    <Link to="/login" className={styles.link}>Login</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;