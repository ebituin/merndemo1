import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/classroom.courses.readonly openid email profile",
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;

      // Optional: store access token locally
      localStorage.setItem("token", accessToken);

      console.log("Access Token:", accessToken);

      navigate("/dashboard");
    },
    onError: () => console.error("Google login failed"),
    flow: "implicit", // or "auth-code" for server-side code exchange
  });

  return (
    <div>
      <h2>Sign in with Google</h2>
      <button onClick={() => login()}>Sign in & Get Access Token</button>
    </div>
  );
};

export default Login;