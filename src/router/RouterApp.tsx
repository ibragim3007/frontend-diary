import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoaderCheckAuth from '../auth/LoadingAuth';
import LoginPage from '../auth/LoginPage';
import RegisterPage from '../auth/RegisterPage';
import Header from '../components/Header/Header';
import PageWithNotes from '../components/Notes/PageWithNotes';
import { API_LOCAL } from '../config';
import { useHttp } from '../hooks/http.auth.hook';
import { TokenResult } from '../interfaces';
import { COLORS } from '../UI/colors';
import { links } from './routerConfig';

const RouterApp: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { data, loading } = useHttp<TokenResult>(`${API_LOCAL}/api/auth/check`, 'GET');
  useEffect(() => {
    if (data?.token) {
      setIsAuth(true);
    }
  }, [loading, data]);

  if (loading) return <LoaderCheckAuth />;

  return (
    <BrowserRouter>
      {!isAuth ? (
        <Routes>
          <Route path={links.login} element={<LoginPage />} />
          <Route path={links.registration} element={<RegisterPage />} />
          <Route path="/*" element={<Navigate to={links.login} />} />
        </Routes>
      ) : (
        <div style={{ backgroundColor: COLORS.backgroundColor }}>
          <Header />
          <Routes>
            <Route path={links.notes} element={<PageWithNotes />} />
            <Route path={'/*'} element={<Navigate to={links.notes} />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
};

export default RouterApp;
