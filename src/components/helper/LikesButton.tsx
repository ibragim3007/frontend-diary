import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, Grid, IconButton } from '@mui/material';
import { motion } from 'framer-motion/dist/framer-motion';
import React from 'react';
import { NoteInterface } from '../../interfaces';
import { COLORS } from '../../UI/colors';

interface LikesButtonProps {
  note?: NoteInterface;
  handlerAddLike: (idNote: string, isLiked: boolean) => Promise<void>;
  isLiked: boolean;
}

const LikesButton: React.FC<LikesButtonProps> = ({ note, handlerAddLike, isLiked }) => {
  const clickLikeButton = async (): Promise<void> => {
    await handlerAddLike(note?._id!, isLiked);
  };

  return (
    <Grid justifyContent="flex-end" container alignContent="center">
      <Grid
        justifyContent="center"
        alignContent="center"
        style={{
          backgroundColor: '#99999913',
          border: isLiked ? `1px solid ${COLORS.secondary}` : '1px solid #a6a6a637',
          display: 'flex',
          alignItems: 'center',
          padding: '0px 0px',
          borderRadius: 30,
        }}
      >
        <motion.div whileTap={{ scale: 1.1 }}>
          <Button style={{ borderRadius: 25, padding: 0 }} onClick={clickLikeButton}>
            <Grid style={{ fontSize: 16, marginLeft: 4, marginRight: 0 }} alignSelf="center" item>
              {note?.usersLiked.length}
            </Grid>
            <Grid item>
              <IconButton size="small" style={{ color: COLORS.secondary }} aria-label="like button">
                {isLiked ? <FavoriteIcon fontSize="inherit" /> : <FavoriteBorderIcon fontSize="inherit" />}
              </IconButton>
            </Grid>
          </Button>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default LikesButton;
