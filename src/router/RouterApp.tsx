import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { grey, purple } from '@mui/material/colors';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoaderCheckAuth from '../auth/LoadingAuth';
import LoginPage from '../auth/LoginPage';
import RegisterPage from '../auth/RegisterPage';
import Header from '../components/Header/Header';
import PageWithPublicNotes from '../components/Notes/PageWithPublicNotes';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import { API_LOCAL } from '../config';
import { ColorModeContext } from '../context/themeContext';
import { userContext } from '../context/userContext';
import { useHttp } from '../hooks/http.auth.hook';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserInterface } from '../interfaces';
import { COLORS } from '../UI/colors';
import { links } from './routerConfig';

const RouterApp: React.FC = () => {
  const { data, loading } = useHttp<UserInterface>(`${API_LOCAL}/api/auth/me`);

  const currentThemMode = localStorage.getItem('theme');
  const [mode, setMode] = React.useState<'light' | 'dark'>(currentThemMode === 'light' ? 'light' : 'dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: (): void => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
        localStorage.setItem('theme', mode === 'light' ? 'dark' : 'light');
      },
    }),
    [mode],
  );

  const themeStorage = localStorage.getItem('theme');
  if (!themeStorage) localStorage.setItem('theme', 'light');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? { primary: purple } // palette values for light mode
            : { primary: grey }), // palette values for dark mode
        },
      }),
    [mode],
  );

  if (loading)
    return (
      <ThemeProvider theme={theme}>
        <LoaderCheckAuth />
      </ThemeProvider>
    );

  return (
    <userContext.Provider value={{ user: data ? data : null }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            {data?.email === undefined || !data ? (
              <Routes>
                <Route path={links.login} element={<LoginPage mode={mode} />} />
                <Route path={links.registration} element={<RegisterPage mode={mode} />} />
                <Route path="*" element={<Navigate to={links.login} />} />
              </Routes>
            ) : (
              <div style={{ backgroundColor: mode === 'light' ? COLORS.backgroundColor : COLORS.backgroundColorDark }}>
                <Header />
                <Routes>
                  <Route path={links.notes} element={<PageWithPublicNotes />} />
                  <Route path={`${links.profile}/:profileId`} element={<ProfilePage />} />
                  <Route path={'*'} element={<Navigate to={links.notes} />} />
                </Routes>
              </div>
            )}
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </userContext.Provider>
  );
};

export default RouterApp;
