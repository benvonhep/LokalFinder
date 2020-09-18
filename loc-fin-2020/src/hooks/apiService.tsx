import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ILocation from '../_interfaces/ILocation'
type DataFromServer = ILocation[]



const useApiService = (url: string) => {
  const baseUrl = 'http://localhost:5000'
  const [response, setResponse] = useState<any>([])
  const [load, setLoad] = useState(false);
  // const [error, setError] = React.useState(null)
  useEffect(() => {
    const fetchData = async (url: string) => {
      try {
        setLoad(true)
        const res = await axios.get(`${baseUrl}${url}`)
        setResponse(res.data)
        setLoad(false)
      } catch (error) {
        console.log(error, 'Error!!');
      }
    }

    fetchData(url)

  }, [url])
  return { response, load }
}

export default useApiService