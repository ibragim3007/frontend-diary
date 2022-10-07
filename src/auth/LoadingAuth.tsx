import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

const LoaderCheckAuth: React.FC = () => {
  return (
    <Grid style={{ height: '100vh' }} container alignItems="center" justifyContent="center">
      <CircularProgress />
    </Grid>
  );
};

export default LoaderCheckAuth;
