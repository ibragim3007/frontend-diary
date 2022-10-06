import { Grid } from '@mui/material';
import React from 'react';
import { COLORS } from '../../UI/colors';
import AddNewNote from './AddNewNote/AddNewNote';

const PageWithNotes: React.FC = () => {
  return (
    <Grid
      style={{
        backgroundColor: COLORS.backgroundColor,
        height: `calc(100vh - ${COLORS.headerHeight}px)`,
        marginTop: 10,
      }}
    >
      <AddNewNote />
    </Grid>
  );
};

export default PageWithNotes;
