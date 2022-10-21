import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { API_LOCAL } from '../../config';
import { useHttp } from '../../hooks/http.auth.hook';
import { NoteInterface } from '../../interfaces';
import CustomSnackBar from '../helper/CustomSnack';
import AddNewNote from './AddNewNote/AddNewNote';
import NoteBlocksPublic from './NoteBlocksPublic/NoteBlocksPublic';

const PageWithPublicNotes: React.FC = () => {
  const { data, loading } = useHttp<NoteInterface[]>(`${API_LOCAL}/api/note/getAllPublicNotes`);
  const [notes, setNotes] = useState<NoteInterface[]>();

  const addNewNotes = (note: NoteInterface): void => {
    if (notes) setNotes([note, ...notes]);
  };

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
      }}
    >
      <AddNewNote addNewNotes={addNewNotes} />
      {!loading && notes ? <NoteBlocksPublic notes={notes} /> : <h1 style={{ color: 'white' }}>Loading...</h1>}
      <CustomSnackBar openSnackBar={openSnack} handleCloseSnackBar={handleCloseSnack} severity="success">
        Changes saved
      </CustomSnackBar>
    </Grid>
  );
};

export default PageWithPublicNotes;
