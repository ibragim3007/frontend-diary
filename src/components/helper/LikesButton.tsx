import React, { useContext } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid, IconButton } from '@mui/material';
import { NoteInterface } from '../../interfaces';
import { userContext } from '../../context/userContext';

interface LikesButtonProps {
  note?: NoteInterface;
  handlerAddLike: (idNote: string, isLiked: boolean) => Promise<void>;
}

const LikesButton: React.FC<LikesButtonProps> = ({ note, handlerAddLike }) => {
  const { user } = useContext(userContext);
  const isLiked: boolean = note?.usersLiked.includes(user?._id!) ? true : false;

  const clickLikeButton = async (): Promise<void> => {
    await handlerAddLike(note?._id!, isLiked);
  };

  return (
    <Grid justifyContent="flex-end" container alignContent="center">
      <Grid
        justifyContent="center"
        alignContent="center"
        style={{
          backgroundColor: '#a6a6a614',
          border: '1px solid #a6a6a669',
          display: 'flex',
          alignItems: 'center',
          padding: '0px 8px',
          borderRadius: 30,
        }}
      >
        <Grid style={{ fontSize: 18 }} alignSelf="center" item>
          {note?.usersLiked.length}
        </Grid>
        <Grid onClick={clickLikeButton} style={{ padding: 0 }} item>
          <IconButton style={{ color: '#d60707be' }} aria-label="like button">
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LikesButton;
