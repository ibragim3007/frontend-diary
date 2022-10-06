import axios from 'axios';
import { useState } from 'react';

type METHODS = 'GET' | 'get' | 'POST' | 'post' | 'PUT' | 'put' | 'DELETE' | 'delete';

export const usePostHttp = <T,>(
  url: string,
): { data: T | undefined; request: (body: unknown) => Promise<T> | void; loading: boolean; error: unknown } => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const request = async (body: unknown): Promise<T> => {
    setLoading(true);
    const result = await axios
      .post<T>(url, body, { headers: { authorization: token ? `Bearer ${token}` : '' } })
      .then(response => {
        setData(response.data);
        setLoading(false);
        return response.data;
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
    return result as T;
  };

  return { data, request, loading, error };
};
