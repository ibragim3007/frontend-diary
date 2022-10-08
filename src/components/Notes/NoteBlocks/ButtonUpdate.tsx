import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton } from '@mui/material';

const ButtonUpdate: React.FC = () => {
  return (
    <Grid item>
      <IconButton style={{ color: 'rgba(0,0, 0,0.2)' }} size="small" aria-label="delete">
        <EditIcon />
      </IconButton>
    </Grid>
  );
};

export default ButtonUpdate;
