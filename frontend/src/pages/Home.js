import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h1>Welcome to my app</h1>
            <p>Please Log in to continue</p>
            <Link to="/login">
                <button>Login with Google</button>
            </Link>
        </div>
    );
}