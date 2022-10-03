import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../auth/LoginPage';
import RegisterPage from '../auth/RegisterPage';
import { API_MAIN } from '../config';
import { links } from './routerConfig';

const RouterApp: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  // useEffect(() => {
  //   const a =  fetch(`${API_MAIN}/auth/check`, { method: 'GET' }).then(res => {
  //     console.log(res);
  //     setIsAuth(true);
  //   });
  // }, []);
  return (
    <BrowserRouter>
      {!isAuth ? (
        <Routes>
          <Route path={links.login} element={<LoginPage />} />
          <Route path={links.registration} element={<RegisterPage />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <Routes>
          <Route />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default RouterApp;
