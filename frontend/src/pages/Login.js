import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const handleSuccess = (credentialResponse) => {
        const token = credentialResponse.credential;
        localStorage.setItem("token", token);
        console.log("Login Success!", token);
        navigate("/dashboard");
    };
    return(
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <div>
            <h1>Login</h1>
            <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Login Failed")} />
        </div>
        </GoogleOAuthProvider>
    );
}

