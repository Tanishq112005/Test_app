// /src/components/Verification.tsx

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { verify_password } from "../keys/links"; // Assuming this points to your /verification route
import "./Auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faLock, faSpinner, faCheckCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

function Verification() {
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    // Retrieve email from localStorage
    const email = localStorage.getItem("email_for_verification");

    

    async function handleVerifyAndReset() {
        if (!otp || !password) {
            setMessage("Please fill in both the OTP and your new password.");
            return;
        }
        setIsLoading(true);
        setMessage("/login");

        try {
            const response = await axios.post(verify_password, {
                email: email,
                otp: otp,
                new_password: password
            });

            if (response.data.msg === "ok") {
                setIsSuccess(true);
                // Clear the stored email on success
                localStorage.removeItem("email_for_verification");
            } else {
                setMessage(response.data.msg || "An unexpected error occurred.");
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.msg || "Something went wrong. Please try again.";
            setMessage(errorMsg);
        } finally {
            setIsLoading(false);
        }
    }
    
    // The Success View
    if (isSuccess) {
        return (
            <div className="login-page">
                <div className="login-card">
                    <div className="success-message">
                        <FontAwesomeIcon icon={faCheckCircle} size="3x" />
                    </div>
                    <div className="login-card__header">
                        <div className="login-card__logo">Success!</div>
                        <p className="login-card__title">
                            Your password has been changed successfully.
                        </p>
                    </div>
                    <button className="btn" onClick={() => navigate("/login")}>
                        Go to Login Page
                    </button>
                </div>
            </div>
        );
    }
    
    // The OTP Form View
    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-card__header">
                    <div className="login-card__logo">Enter Details</div>
                    <p className="login-card__title">
                        An OTP was sent to <strong>{email}</strong>. Enter it below along with your new password.
                    </p>
                </div>

                <div className="form-group">
                    <input
                        placeholder="6-Digit OTP"
                        onChange={(e) => setOtp(e.target.value)}
                        disabled={isLoading}
                        maxLength={6}
                    />
                     <FontAwesomeIcon icon={faKey} className="input-icon" />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="New Password"
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                     <FontAwesomeIcon icon={faLock} className="input-icon" />
                </div>
                
                <button className="btn" onClick={handleVerifyAndReset} disabled={isLoading}>
                    {isLoading ? (
                        <>
                             <FontAwesomeIcon icon={faSpinner} className="spinner" />
                             Verifying...
                        </>
                    ) : (
                        "Reset Password"
                    )}
                </button>
                
                {message && (
                     <div className="error-message">
                         <FontAwesomeIcon icon={faExclamationCircle} />
                         {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Verification;