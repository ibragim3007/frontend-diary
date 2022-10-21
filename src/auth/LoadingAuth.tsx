import { CircularProgress, Grid, Paper } from '@mui/material';
import React from 'react';

const LoaderCheckAuth: React.FC = () => {
  return (
    <Paper>
      <Grid style={{ height: '100vh' }} container alignItems="center" justifyContent="center">
        <CircularProgress />
      </Grid>
    </Paper>
  );
};

export default LoaderCheckAuth;
