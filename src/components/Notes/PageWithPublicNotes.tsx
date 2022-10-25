import { CircularProgress, Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { API_LOCAL } from '../../config';
import { userContext } from '../../context/userContext';
import { useHttp } from '../../hooks/http.auth.hook';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NoteInterface } from '../../interfaces';
import { AddLike } from '../func/AddLike';
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

  const { user } = useContext(userContext);

  const handlerAddLike = async (idNote: string, isLiked: boolean): Promise<void> => {
    await AddLike(user!, idNote, isLiked, notes!, setNotes);
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
      {!loading && notes ? (
        <NoteBlocksPublic handlerAddLike={handlerAddLike} notes={notes} />
      ) : (
        <h1 style={{ color: 'white' }}>Loading...</h1>
      )}
      <CustomSnackBar openSnackBar={openSnack} handleCloseSnackBar={handleCloseSnack} severity="success">
        Changes saved
      </CustomSnackBar>
    </Grid>
  );
};

export default PageWithPublicNotes;
