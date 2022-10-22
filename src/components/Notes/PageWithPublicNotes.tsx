import { CircularProgress, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { API_LOCAL } from '../../config';
import { useHttp } from '../../hooks/http.auth.hook';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NoteInterface } from '../../interfaces';
import CustomSnackBar from '../helper/CustomSnack';
import NoteBlocksPublic from './NoteBlocksPublic/NoteBlocksPublic';

const PageWithPublicNotes: React.FC = () => {
  const { data, loading } = useHttp<NoteInterface[]>(`${API_LOCAL}/api/note/getAllPublicNotes`);
  const [notes, setNotes] = useState<NoteInterface[]>();

  const [openSnack, setOpenSnack] = React.useState(false);
  const handleCloseSnack = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') return;

    setOpenSnack(false);
  };

  useEffect(() => {
    setNotes(data);
  }, [data, loading]);

  if (loading) return <CircularProgress />;

  return (
    <Grid
      style={{
        marginTop: 10,
        minHeight: '100vh',
      }}
    >
      <Paper style={{ padding: 10 }}>
        <Typography variant="h6" style={{ maxWidth: 600, margin: 'auto' }}>
          Here you can see the notes of users of this service, in order to add and make your entry visible to everyone,
          you need to go to your profile and mark the desired checkbox
        </Typography>
      </Paper>
      {!loading && notes ? <NoteBlocksPublic notes={notes} /> : <h1 style={{ color: 'white' }}>Loading...</h1>}
      <CustomSnackBar openSnackBar={openSnack} handleCloseSnackBar={handleCloseSnack} severity="success">
        Changes saved
      </CustomSnackBar>
    </Grid>
  );
};

export default PageWithPublicNotes;
