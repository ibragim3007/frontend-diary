import { Grid } from '@mui/material';
import React from 'react';

interface SubTextProps {
  children: React.ReactChild | React.ReactNode;
}

const SubText: React.FC<SubTextProps> = ({ children }) => {
  return (
    <Grid item style={{ fontSize: '0.8em', color: '#999', marginBottom: 15, wordWrap: 'break-word' }}>
      {children}
    </Grid>
  );
};

export default SubText;
