import { CircularProgress, Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { API_LOCAL } from '../../../config';
import { userContext } from '../../../context/userContext';
import { useHttp } from '../../../hooks/http.auth.hook';
import { NoteInterface } from '../../../interfaces';
import { AddLike } from '../../func/AddLike';
import CustomSnackBar from '../../helper/CustomSnack';
import NoteBlocksPublic from '../../Notes/NoteBlocksPublic/NoteBlocksPublic';

const LikedPage: React.FC = () => {
  const [openSnack, setOpenSnack] = React.useState(false);
  const handleCloseSnack = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') return;

    setOpenSnack(false);
  };

  const { data, loading } = useHttp<{ noteLiked: NoteInterface; date: Date }[]>(`${API_LOCAL}/api/auth/allLikedNotes`);

  const [likedNotes, setLikedNotes] = useState<NoteInterface[]>();

  useEffect(() => {
    const sortArray = data?.sort((objA, objB) => Number(objB.date) - Number(objA.date));

    const sortedNotesArray = data?.map(item => {
      return item.noteLiked;
    });
    if (data && !loading && sortArray && sortedNotesArray) {
      setLikedNotes(sortedNotesArray.reverse());
    }
  }, [data, loading]);

  const { user } = useContext(userContext);

  const handlerAddLike = async (idNote: string, isLiked: boolean): Promise<void> => {
    await AddLike(user!, idNote, isLiked, likedNotes!, setLikedNotes);
  };

  if (loading) return <CircularProgress />;

  return (
    <Grid
      style={{
        marginTop: 10,
        minHeight: '100vh',
      }}
    >
      {!loading && likedNotes ? (
        <NoteBlocksPublic handlerAddLike={handlerAddLike} notes={likedNotes} />
      ) : (
        <h1 style={{ color: 'white' }}>Loading...</h1>
      )}
      <CustomSnackBar openSnackBar={openSnack} handleCloseSnackBar={handleCloseSnack} severity="success">
        Changes saved
      </CustomSnackBar>
    </Grid>
  );
};

export default LikedPage;
