import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NoteInterface } from '../../../interfaces';
import { getFullTime } from '../../helper/convertTime';

interface NoteBlockPublicProps {
  note: NoteInterface;
}

const NoteBlockPublic: React.FC<NoteBlockPublicProps> = ({ note }) => {
  const theme = localStorage.getItem('theme');
  return (
    <Paper>
      <Grid style={{ borderRadius: 10, padding: 20 }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ borderBottom: '1px solid rgba(125, 125, 125, 0.2)', marginBottom: 7, paddingBottom: 7 }}
        >
          <Typography variant="h5">
            <NavLink
              style={{ cursor: 'pointer', textDecoration: 'none', color: theme === 'light' ? '#111' : '#eee' }}
              to={`/profile/${note.idUser!}`}
            >
              {note.user?.firstname} {note.user?.lastname}
            </NavLink>
          </Typography>
          <Typography variant="subtitle1" style={{ color: '#888', fontSize: 12, fontStyle: 'italic' }}>
            {getFullTime(note.timestamps.createdAt)}
          </Typography>
        </Grid>
        <Typography variant="h6">{note.title}</Typography>
        <Grid container alignSelf="flex-end">
          <Grid style={{ marginTop: 6 }} item>
            <Typography style={{ fontSize: 14, lineHeight: 1.67, wordSpacing: 2.45 }}>{note.text}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NoteBlockPublic;
