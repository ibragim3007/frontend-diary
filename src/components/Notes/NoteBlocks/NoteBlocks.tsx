import { Grid } from '@mui/material';
import React from 'react';
import { NoteInterface } from '../../../interfaces';
import NoteBlock from './NoteBlock';

interface NoteBlocksProps {
  notes: NoteInterface[];
  deleteNote: (id: string) => Promise<void>;
  updateNote: (id: string, title: string, text: string) => Promise<void>;
}

const NoteBlocks: React.FC<NoteBlocksProps> = ({ notes, deleteNote, updateNote }) => {
  return (
    <Grid style={{ padding: 20 }}>
      {notes?.map(note => {
        return <NoteBlock updateNote={updateNote} deleteNote={deleteNote} key={note._id} note={note} />;
      })}
    </Grid>
  );
};

export default NoteBlocks;
