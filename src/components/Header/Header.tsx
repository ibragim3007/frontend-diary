import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button, Grid, IconButton, Paper, Typography, useMediaQuery } from '@mui/material';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { TITLE } from '../../config';
import { userContext } from '../../context/userContext';
import { links } from '../../router/routerConfig';
import { COLORS } from '../../UI/colors';

const Header: React.FC = () => {
  const matches = useMediaQuery('(min-width: 500px)');
  const exitButton = (): void => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const { user } = useContext(userContext);
  return (
    <Paper style={{ borderRadius: 0 }}>
      <Grid
        alignItems="center"
        container
        style={{
          height: COLORS.headerHeight,
          padding: '10px 20px',
          borderRadius: '0px 0px 0px 0px',
          maxWidth: 1920,
          margin: 'auto',
        }}
        justifyContent="space-between"
      >
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <Grid item>
            <Typography
              style={{
                fontSize: 30,
                textTransform: 'uppercase',
                letterSpacing: 1.4,
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              {TITLE}
            </Typography>
          </Grid>
        </NavLink>
        <Grid item>
          {matches ? (
            <Grid alignItems="center" spacing={3} container item>
              <Grid item>
                <NavLink to={`${links.profile}/${user ? user?._id : ''}`} style={{ textDecoration: 'none' }}>
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
            <Grid alignItems="center" spacing={0} container item>
              <Grid item>
                <NavLink to={links.profile} style={{ textDecoration: 'none' }}>
                  <IconButton size="large">
                    <AccountBoxIcon />
                  </IconButton>
                </NavLink>
              </Grid>
              <Grid item>
                <IconButton onClick={exitButton} size="large">
                  <ExitToAppIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Header;
