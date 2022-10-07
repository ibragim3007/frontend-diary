import { Grid } from '@mui/material';
import React from 'react';
import { NoteInterface } from '../../../interfaces';
import NoteBlock from './NoteBlock';

interface NoteBlocksProps {
  notes: NoteInterface[];
}

const NoteBlocks: React.FC<NoteBlocksProps> = ({ notes }) => {
  return (
    <Grid style={{ padding: 20 }}>
      {notes?.map(note => {
        return <NoteBlock key={note._id} note={note} />;
      })}
    </Grid>
  );
};

export default NoteBlocks;
