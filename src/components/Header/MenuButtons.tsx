import { Grid, Button, IconButton, useMediaQuery } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { links } from '../../router/routerConfig';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserInterface } from '../../interfaces';
import './styleHeader.css';

interface MenuButtonsProps {
  user: UserInterface | null;
}

const MenuButtons: React.FC<MenuButtonsProps> = ({ user }) => {
  const exitButton = (): void => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const matches = useMediaQuery('(min-width: 500px)');

  return (
    <>
      {' '}
      {matches ? (
        <Grid alignItems="center" spacing={3} container item>
          <Grid item>
            <NavLink
              className={({ isActive }): string => {
                return isActive ? 'link-active' : 'link';
              }}
              to={`${links.notes}`}
              style={{ textDecoration: 'none' }}
            >
              <Button size="large" startIcon={<ChromeReaderModeIcon />}>
                Notes
              </Button>
            </NavLink>
          </Grid>
          <Grid item>
            <NavLink
              className={({ isActive }): string => {
                return isActive ? 'link-active' : 'link';
              }}
              to={`${links.profile}/${user ? user?._id : ''}`}
              style={{ textDecoration: 'none' }}
            >
              <Button size="large" startIcon={<AccountBoxIcon />}>
                Profile
              </Button>
            </NavLink>
          </Grid>
          <Grid item>
            <Button onClick={exitButton} size="large" startIcon={<ExitToAppIcon />}>
              Exit
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid alignItems="center" container item>
          <Grid item>
            <NavLink
              className={({ isActive }): string => {
                return isActive ? 'link-active-mobile' : 'link';
              }}
              to={`${links.notes}`}
              style={{ textDecoration: 'none' }}
            >
              <IconButton>
                <ChromeReaderModeIcon />
              </IconButton>
            </NavLink>
          </Grid>
          <Grid item>
            <NavLink
              className={({ isActive }): string => {
                return isActive ? 'link-active-mobile' : 'link';
              }}
              to={`${links.profile}/${user ? user?._id : ''}`}
              style={{ textDecoration: 'none' }}
            >
              <IconButton>
                <AccountBoxIcon />
              </IconButton>
            </NavLink>
          </Grid>
          <Grid item>
            <IconButton onClick={exitButton}>
              <ExitToAppIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default MenuButtons;
