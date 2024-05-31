import {Navigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode"
import api from '../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
import { useState, useEffect} from 'react';

function ProtectedRoute({children}) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(()=> setIsAuthorized(false));//load protected route
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN); //Get the refresh token
    try {
      const response = await api.post('/api/token/refresh', { //Send a request to the server to get a new access token
        refresh: refreshToken,
    });
    if (response.status === 200) {
      localStorage.setItem(ACCESS_TOKEN, response.data.access); //Save the new access token
      setIsAuthorized(true);
    }else{
      setIsAuthorized(false);
    }
  } catch (error) {
    setIsAuthorized(false);
  }
}

  const auth = async () => { //Check if we have one acc token
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    }else{
      setIsAuthorized(true);
    }
  }

  if (isAuthorized === null) {
    return <div>Loading...</div>
  }

  return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute;
