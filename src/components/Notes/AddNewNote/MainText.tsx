import { Typography } from '@mui/material';
import React from 'react';

interface MainTextProps {
  children: React.ReactChild | React.ReactNode;
}

const MainText: React.FC<MainTextProps> = ({ children }) => {
  return (
    <Typography style={{ color: '#333', marginBottom: 5 }} variant="h5">
      {children}
    </Typography>
  );
};

export default MainText;
