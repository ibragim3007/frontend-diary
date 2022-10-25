import { Grid, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion/dist/framer-motion';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { userContext } from '../../../context/userContext';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NoteInterface } from '../../../interfaces';
import { COLORS } from '../../../UI/colors';
import { getFullTime } from '../../helper/convertTime';
import LikesButton from '../../helper/LikesButton';

interface NoteBlockPublicProps {
  note: NoteInterface;
  handlerAddLike: (idNote: string, isLiked: boolean) => Promise<void>;
}

const NoteBlockPublic: React.FC<NoteBlockPublicProps> = ({ note, handlerAddLike }) => {
  const theme = localStorage.getItem('theme');
  const { user } = useContext(userContext);
  const isLiked: boolean = note?.usersLiked.includes(user?._id!) ? true : false;

  return (
    <motion.div style={{ display: 'flex' }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
      <Paper>
        <Grid alignContent="space-between" container style={{ borderRadius: 10, padding: 20, height: '100%' }}>
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
            <Typography
              variant="subtitle1"
              style={{ color: isLiked ? COLORS.secondary : '#888', fontSize: 12, fontStyle: 'italic' }}
            >
              {getFullTime(note.timestamps.createdAt)}
            </Typography>
          </Grid>
          <Typography variant="h6">{note.title}</Typography>
          <Grid container alignSelf="flex-end">
            <Grid style={{ marginTop: 6 }} item>
              <Typography style={{ fontSize: 14, lineHeight: 1.67, wordSpacing: 2.45 }}>{note.text}</Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="center" item>
            <LikesButton isLiked={isLiked} handlerAddLike={handlerAddLike} note={note} />
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );
};

export default NoteBlockPublic;
