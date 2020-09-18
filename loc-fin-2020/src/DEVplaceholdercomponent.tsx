import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import useApiService from './hooks/apiService';
import ILocation from './interfaces/ILocation'




export default (): JSX.Element => {
  // const [locations, loading] = useApiService('/locations')
  const [locations, setLocations] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:5000/locations'
    }).then(res => {
      setLocations(res.data)
    })
    return () => {
      console.log('cleaned up');

    }
  }, [])

  return (
    <div>
      {locations.map((location: ILocation) => (
        <p key={location.id}>{location.name}</p>
      ))}
    </div>
  )
}
