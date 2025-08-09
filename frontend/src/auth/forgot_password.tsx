// /src/components/ForgotPassword.tsx

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router"; // Use react-router-dom
import { forgot_password } from "../keys/links";
import "./Auth.css"; // Import the styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faSpinner, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";


function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handlePasswordReset() {
        if (!email) {
            setMessage("Please enter your email address.");
            return;
        }
        setIsLoading(true);
        setMessage("");
        
        try {
           
            const response = await axios.post(forgot_password, { email });

            if (response.data.msg === "ok") {
                // Store email to use on the verification page
                localStorage.setItem("email_for_verification", email);
                // Navigate to the verification page
                navigate("/verification"); 
            } else {
                // Handle potential errors sent with a 200 status
                setMessage(response.data.msg || "An unexpected error occurred.");
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.msg || "Something went wrong. Please try again.";
            setMessage(errorMsg);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-card__header">
                    <div className="login-card__logo">Reset Password</div>
                    <p className="login-card__title">
                        Enter your email to receive a One-Time Password (OTP).
                    </p>
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                    <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                </div>

                <button className="btn" onClick={handlePasswordReset} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <FontAwesomeIcon icon={faSpinner} className="spinner" />
                            Sending...
                        </>
                    ) : (
                        "Send OTP"
                    )}
                </button>

                {message && (
                    <div className="error-message">
                         <FontAwesomeIcon icon={faExclamationCircle} />
                         {message}
                    </div>
                )}
                 <div className="links-container">
                    <a href="/login" className="link">Back to Login</a>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;