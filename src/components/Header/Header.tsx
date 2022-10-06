import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button, Grid, IconButton, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { TITLE } from '../../config';
import { COLORS } from '../../UI/colors';

const Header: React.FC = () => {
  const matches = useMediaQuery('(min-width: 500px)');
  return (
    <Grid
      alignItems="center"
      container
      style={{
        backgroundColor: COLORS.landBackgroundColor,
        height: COLORS.headerHeight,
        padding: '10px 20px',
        borderRadius: '0px 0px 10px 10px',
      }}
      justifyContent="space-between"
    >
      <Grid item>
        <Typography
          style={{
            fontSize: 30,
            textTransform: 'uppercase',
            letterSpacing: 1.4,
            cursor: 'pointer',
            color: COLORS.backgroundColor,
            fontWeight: 'bold',
          }}
        >
          {TITLE}
        </Typography>
      </Grid>
      <Grid item>
        {matches ? (
          <Grid alignItems="center" spacing={3} container item>
            <Grid item>
              <Button size="large" startIcon={<AccountBoxIcon />} style={{ color: COLORS.backgroundColor }}>
                Profile
              </Button>
            </Grid>
            <Grid item>
              <Button size="large" startIcon={<ExitToAppIcon />} style={{ color: COLORS.backgroundColor }}>
                Exit
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid alignItems="center" spacing={0} container item>
            <Grid item>
              <IconButton size="large" style={{ color: COLORS.backgroundColor }}>
                <AccountBoxIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton size="large" style={{ color: COLORS.backgroundColor }}>
                <ExitToAppIcon />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Header;
