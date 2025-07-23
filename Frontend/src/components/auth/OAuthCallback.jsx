import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Loader2 } from "lucide-react";

const OAuthCallback = () => {
  const { login } = useAuth();

  useEffect(() => {
    // Check if there's a token in the URL params or cookies
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // If token is in URL, store it and redirect
      localStorage.setItem("authToken", token);
      login({ token });
      window.location.href = "/dashboard";
    } else {
      // Check cookies for token (since your backend sets httpOnly cookies)
      // The token should be automatically included in requests
      fetch("http://localhost:5000/api/auth/verify", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Authentication failed");
        })
        .then((data) => {
          login(data.user);
          window.location.href = "/dashboard";
        })
        .catch((error) => {
          console.error("OAuth callback error:", error);
          window.location.href = "/login?error=oauth_failed";
        });
    }
  }, [login]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center">
      <Loader2 className="h-8 w-8 animate-spin text-teal-600 mb-4" />
      <p className="text-gray-600 dark:text-gray-400">
        Completing authentication...
      </p>
    </div>
  );
};

export default OAuthCallback;
