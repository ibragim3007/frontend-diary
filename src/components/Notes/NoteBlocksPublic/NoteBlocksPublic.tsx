import { Grid } from '@mui/material';
import React from 'react';
import { NoteInterface } from '../../../interfaces';
import NoteBlockPublic from './NoteBlockPublic';

interface NoteBlocksPublicProps {
  notes: NoteInterface[];
}

const NoteBlocksPublic: React.FC<NoteBlocksPublicProps> = ({ notes }) => {
  return (
    <Grid
      style={{
        maxWidth: 1600,
        margin: 'auto',
        padding: 20,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 400px))',
        gridGap: 15,
        justifyContent: 'center',
      }}
    >
      {notes?.map(note => {
        return <NoteBlockPublic key={note._id} note={note} />;
      })}
    </Grid>
  );
};

export default NoteBlocksPublic;
