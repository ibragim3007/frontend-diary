import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { API_LOCAL } from '../../config';
import { useHttp } from '../../hooks/http.auth.hook';
import { usePostHttp } from '../../hooks/post.http.hook';
import { NoteInterface } from '../../interfaces';
import { COLORS } from '../../UI/colors';
import CustomSnackBar from '../helper/CustomSnack';
import AddNewNote from './AddNewNote/AddNewNote';
import NoteBlocks from './NoteBlocks/NoteBlocks';

const PageWithNotes: React.FC = () => {
  const { data, loading } = useHttp<NoteInterface[]>(`${API_LOCAL}/api/note/getAllNotes`, 'GET');
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

  const deleteNoteMutation = usePostHttp(`${API_LOCAL}/api/note/delete`);
  const deleteNote = async (id: string): Promise<void> => {
    setNotes(notes?.filter(item => item._id !== id));
    await deleteNoteMutation.request({ id });
  };

  const updateNoteMutation = usePostHttp(`${API_LOCAL}/api/note/update`);
  const updateNote = async (id: string, title: string, text: string): Promise<void> => {
    setNotes(
      notes?.map(note => {
        if (note._id === id) {
          note.text = text;
          note.title = title;
        }
        return note;
      }),
    );
    await updateNoteMutation.request({ _id: id, title, text });
    setOpenSnack(true);
  };

  if (loading) return <h1>Loading</h1>;

  return (
    <Grid
      style={{
        marginTop: 10,
      }}
    >
      <AddNewNote addNewNotes={addNewNotes} />
      {!loading && notes ? (
        <NoteBlocks updateNote={updateNote} deleteNote={deleteNote} notes={notes} />
      ) : (
        <h1 style={{ color: 'white' }}>Loading...</h1>
      )}
      <CustomSnackBar openSnackBar={openSnack} handleCloseSnackBar={handleCloseSnack} severity="success">
        Changes saved
      </CustomSnackBar>
    </Grid>
  );
};

export default PageWithNotes;
