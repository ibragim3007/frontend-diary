import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface CustomSnackBarProps {
  openSnackBar: boolean;
  handleCloseSnackBar(event: React.SyntheticEvent | Event, reason?: string): void;
  severity: 'success' | 'info' | 'warning' | 'error';
  children: React.ReactChild | React.ReactNode;
}

const CustomSnackBar: React.FC<CustomSnackBarProps> = ({ openSnackBar, handleCloseSnackBar, severity, children }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={openSnackBar}
      autoHideDuration={4000}
      onClose={handleCloseSnackBar}
    >
      <Alert onClose={handleCloseSnackBar} severity={severity} sx={{ width: '100%' }}>
        {children}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBar;
