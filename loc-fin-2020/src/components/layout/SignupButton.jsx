import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";


const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  const signup = () => {
    loginWithRedirect({
      screen_hint: "signup",
    })
  }

  return (
    <Button
      onClick={() => signup()
      }
      variant="outline-secondary"
      className="mt-2"
      size="sm"
    >
      Sign Up
    </Button>
  );
};

export default SignupButton;