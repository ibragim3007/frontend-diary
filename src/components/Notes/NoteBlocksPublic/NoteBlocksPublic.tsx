import { Grid } from '@mui/material';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NoteInterface } from '../../../interfaces';
import NoteBlockPublic from './NoteBlockPublic';

interface NoteBlocksPublicProps {
  notes: NoteInterface[];
  handlerAddLike: (idNote: string, isLiked: boolean) => Promise<void>;
}

const NoteBlocksPublic: React.FC<NoteBlocksPublicProps> = ({ notes, handlerAddLike }) => {
  return (
    <Grid
      style={{
        maxWidth: 1600,
        margin: 'auto',
        padding: 5,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 400px))',
        gridGap: 15,
        justifyContent: 'center',
      }}
    >
      {notes?.map(note => {
        return <NoteBlockPublic handlerAddLike={handlerAddLike} key={note._id} note={note} />;
      })}
    </Grid>
  );
};

export default NoteBlocksPublic;
