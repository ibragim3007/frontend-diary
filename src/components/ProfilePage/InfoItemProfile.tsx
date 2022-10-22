import { Grid, Typography } from '@mui/material';
import React from 'react';

interface InfoItemProfileProps {
  info: string;
  data: string | number | Date;
  hide?: boolean;
}

const InfoItemProfile: React.FC<InfoItemProfileProps> = ({ info, data }) => {
  return (
    <Grid
      justifyContent="space-between"
      container
      style={{ maxWidth: 600, minWidth: 260, borderBottom: '1px solid rgba(125, 125, 125, 0.5)', padding: 5 }}
    >
      <Grid item>
        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          {info}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">{data}</Typography>
      </Grid>
    </Grid>
  );
};

export default InfoItemProfile;
