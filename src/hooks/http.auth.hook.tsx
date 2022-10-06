import axios from 'axios';
import { useEffect, useState } from 'react';

type METHODS = 'GET' | 'get' | 'POST' | 'post' | 'PUT' | 'put' | 'DELETE' | 'delete';

export const useHttp = <T,>(
  url: string,
  method?: METHODS,
  body?: unknown,
): { data: T | undefined; loading: boolean; error: unknown } => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      if (method === 'get' || method === 'GET') {
        setLoading(true);
        axios
          .get<T>(url, { headers: { authorization: token ? `Bearer ${token}` : '' } })
          .then(response => {
            setData(response.data);
            setLoading(false);
          })
          .catch(error => {
            setError(error);
            setLoading(false);
          })
          .finally(() => {
            setLoading(false);
          });
      }
      setLoading(false);
      if (method === 'POST' || method === 'post') {
        setLoading(true);
        axios
          .post<T>(url, { headers: { authorization: token ? `Bearer ${token}` : '' }, body: body })
          .then(response => {
            setData(response.data);
            setLoading(false);
          })
          .catch(error => {
            setError(error);
            setLoading(false);
          })
          .finally(() => {
            setLoading(false);
          });
      }
      setLoading(false);
    }
  }, [body, method, token, url]);

  return { data, loading, error };
};
