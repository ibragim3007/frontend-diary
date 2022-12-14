import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { API_LOCAL } from '../../config';
import { useHttp } from '../../hooks/http.auth.hook';
import { usePostHttp } from '../../hooks/post.http.hook';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NoteInterface } from '../../interfaces';
import CustomSnackBar from '../helper/CustomSnack';
import AddNewNote from './AddNewNote/AddNewNote';
import NoteBlocks from './NoteBlocks/NoteBlocks';

interface PageWithNotesProps {
  changeQuantityNotes?: (newNumber: number) => void;
}

const PageWithNotes: React.FC<PageWithNotesProps> = ({ changeQuantityNotes }) => {
  const { data, loading } = useHttp<NoteInterface[]>(`${API_LOCAL}/api/note/getAllMyNotes`);
  const [notes, setNotes] = useState<NoteInterface[]>();

  changeQuantityNotes ? changeQuantityNotes(notes ? notes?.length : 0) : null;

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

  const changePublicMutation = usePostHttp(`${API_LOCAL}/api/note/changePublic`);
  const changePublicNote = async (id: string, isPublic: boolean): Promise<void> => {
    setNotes(
      notes?.map(note => {
        if (note._id === id) note.isPublic = !note.isPublic;
        return note;
      }),
    );
    const data = await changePublicMutation.request({ _id: id, isPublic: !isPublic });
    console.log(data);
    setOpenSnack(true);
  };

  if (loading) return <CircularProgress />;

  return (
    <Grid
      style={{
        marginTop: 10,
      }}
    >
      <AddNewNote addNewNotes={addNewNotes} />
      {!loading && notes ? (
        <NoteBlocks changePublicNote={changePublicNote} updateNote={updateNote} deleteNote={deleteNote} notes={notes} />
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
