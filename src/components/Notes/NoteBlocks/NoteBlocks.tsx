import { Grid } from '@mui/material';
import React from 'react';
import { NoteInterface } from '../../../interfaces';
import NoteBlock from './NoteBlock';

interface NoteBlocksProps {
  notes: NoteInterface[];
<<<<<<< Updated upstream
}

const NoteBlocks: React.FC<NoteBlocksProps> = ({ notes }) => {
=======
  deleteNote: (id: string) => Promise<void>;
  updateNote: (id: string, title: string, text: string) => Promise<void>;
}

const NoteBlocks: React.FC<NoteBlocksProps> = ({ notes, deleteNote, updateNote }) => {
>>>>>>> Stashed changes
  return (
    <Grid style={{ padding: 20 }}>
      {notes?.map(note => {
<<<<<<< Updated upstream
        return <NoteBlock key={note._id} note={note} />;
=======
        return <NoteBlock updateNote={updateNote} deleteNote={deleteNote} key={note._id} note={note} />;
>>>>>>> Stashed changes
      })}
    </Grid>
  );
};

export default NoteBlocks;
