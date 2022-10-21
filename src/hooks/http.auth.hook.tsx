import axios from 'axios';
import { useEffect, useState } from 'react';

type METHODS = 'GET' | 'get';

export const useHttp = <T,>(url: string): { data: T | undefined; loading: boolean; error: unknown } => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    setLoading(false);
    if (token) {
      setLoading(true);
      try {
        axios
          .get<T>(url, { headers: { authorization: token ? `Bearer ${token}` : '' } })
          .then(response => {
            setData(response.data);
            setLoading(false);
          })
          .catch(error => {
            setError(error);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, [token, url]);

  return { data, loading, error };
};
