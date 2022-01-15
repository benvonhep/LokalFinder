import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const style = {
    position: 'absolute',
    left: '5px',
    bottom: '15px',
    height: '25px',
    margin: '0',
    marginLeft: '10px',
    padding: '0 12px',
  };
  return (
    <Button
      style={style}
      onClick={() => loginWithRedirect()}
      variant="outline-warning"
      className=""
      size="sm"
    >
      Log In
    </Button>
  );
};

export default LoginButton;
