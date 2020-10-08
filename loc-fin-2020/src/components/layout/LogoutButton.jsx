import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LogoutButton = () => {
  const { logout } = useAuth0();

  // const style = {
  //   position: 'absolute',
  //   left: '5px',
  //   bottom: '15px',
  //   height: '25px',
  //   margin: '0',
  //   padding: '0 8px',
  // }

  return (
    <Button
      // style={style}
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
      variant="outline-warning"
      className="btn-margin"
      size="sm"
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;