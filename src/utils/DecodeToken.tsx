import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const getAuthToken = () => {
  return localStorage.getItem('LOCAL_STORAGE_TOKEN');
};

export default function useDecodedToken() {
    const [decodedToken, setDecodedToken] = useState(null);
  
    useEffect(() => {
      const token = getAuthToken();
      if (token) {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      }
    }, []);
  
    return decodedToken;
}
