import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Grid, IconButton, Paper, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ColorModeContext } from '../../context/themeContext';

const ProfilePage: React.FC = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Grid container>
      <Grid item>
        <Paper>
          <Grid style={{ border: '1px solid #999', padding: 10, borderRadius: 5 }} container alignItems="center">
            <Typography>Change theme to dark mode?</Typography>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <Paper>
          <Grid>
            <Typography>FirstName LastName</Typography>
            <Typography>Date of create: 24/10/2022</Typography>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
