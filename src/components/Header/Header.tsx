import { Grid, Paper, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { TITLE } from '../../config';
import { userContext } from '../../context/userContext';
import { COLORS } from '../../UI/colors';
import MenuButtons from './MenuButtons';

const Header: React.FC = () => {
  const { user } = useContext(userContext);
  const theme = localStorage.getItem('theme');

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
                color: theme === 'light' ? COLORS.backgroundColor : '#fff',
              }}
            >
              {TITLE}
            </Typography>
          </Grid>
        </NavLink>
        <Grid item>
          <MenuButtons user={user} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Header;
