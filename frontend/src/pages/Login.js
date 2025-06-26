import React, {useEffect} from "react";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";


const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const initClient = () => {
            console.log(clientId);
            gapi.load("client:auth2", () => {
                console.log(clientId);
                gapi.client.init({
                    
                    clientId: clientId,
                    scope: "https://www.googleapis.com/auth/classroom.courses.readonly",
                });
            });

        };
        initClient();
    }, []);

    const handleLogin = () => {
        const authInstance = gapi.auth2.getAuthInstance();

        authInstance.signIn().then((googleUser) => {
            const token = googleUser.getAuthResponse().access_token;
            console.log("Google ID Token:", token);

            fetch("http://localhost:5000/auth/google", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({token}),
            })
            .then((res) => res.json())
            .then((data) => {
                localStorage.setItem("token", token);
                navigate("/dashboard");
            })
            .catch((error) => console.log("error", error));
        
        });
    };
    return(
        <div>
            <h2>Login with Google</h2>
            <button onClick={handleLogin}>Sign in with Google</button>
        </div>
    )

}
export default Login;

