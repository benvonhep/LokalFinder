import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { addUser } from "../../store/actions/usersAction";


const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  const { user } = useAuth0();
  const dispatch = useDispatch();


  // user from auth

  // if user not yet exists email
  // add user email to new user

  // id to submit button
  const signup = () => {

    loginWithRedirect({
      screen_hint: "signup",
    })
    const newUser = {
      email: user.email,
      username: user.name,
      picture: '',
      description: '',
      city: ''

    }
    dispatch(addUser(newUser))

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