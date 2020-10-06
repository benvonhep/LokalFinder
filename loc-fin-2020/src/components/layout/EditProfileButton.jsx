import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const EditProfileButton = () => {

  const style = {
    position: 'absolute',
    left: '5px',
    bottom: '15px',
    height: '25px',
    margin: '0',
    padding: '0 8px',
  }
  return (
    <Button
      // style={style}
      href="/profile"
      // onClick={() => loginWithRedirect()}
      variant="outline-secondary"
      className=""
      size="sm"
    >
      Edit Profile
    </Button>
  );
};

export default EditProfileButton;