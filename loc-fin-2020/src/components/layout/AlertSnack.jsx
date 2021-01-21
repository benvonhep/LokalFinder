import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap'

const AlertSnack = () => {
  const alerts = useSelector(state => state.alerts)



  return (
    <>
      {
        alerts.length > 0 ?  alerts.map(alert => (
            <Alert key={alert.id} variant={alert.alertType}>
              {alert.msg}
            </Alert>
          )) : ''
      }
    </>
  )
}
export default AlertSnack;
