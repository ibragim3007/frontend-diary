import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { API_LOCAL } from '../../config';
import { useHttp } from '../../hooks/http.auth.hook';
import { NoteInterface } from '../../interfaces';
import { COLORS } from '../../UI/colors';
import AddNewNote from './AddNewNote/AddNewNote';
import NoteBlocks from './NoteBlocks/NoteBlocks';

const PageWithNotes: React.FC = () => {
  const { data, loading } = useHttp<NoteInterface[]>(`${API_LOCAL}/api/note/getAllNotes`, 'GET');
  const [notes, setNotes] = useState<NoteInterface[]>();

  const addNewNotes = (note: NoteInterface): void => {
    if (notes) setNotes([note, ...notes]);
  };

  useEffect(() => {
    setNotes(data);
  }, [data, loading]);

  if (loading) return <h1>Loading</h1>;

  return (
    <Grid
      style={{
        backgroundColor: COLORS.backgroundColor,
        marginTop: 10,
        minHeight: '100vh',
      }}
    >
      <AddNewNote addNewNotes={addNewNotes} />
      {!loading && notes ? <NoteBlocks notes={notes} /> : <h1 style={{ color: 'white' }}>Loading...</h1>}
    </Grid>
  );
};

export default PageWithNotes;
