import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuthCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/auth/check-auth', {
          withCredentials: true, 
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []); 

  return isAuthenticated;
};

export default useAuthCheck;