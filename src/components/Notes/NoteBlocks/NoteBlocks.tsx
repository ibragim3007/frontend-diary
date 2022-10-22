import { Grid } from '@mui/material';
import React from 'react';
import { NoteInterface } from '../../../interfaces';
import NoteBlock from './NoteBlock';

interface NoteBlocksProps {
  notes: NoteInterface[];
  deleteNote: (id: string) => Promise<void>;
  updateNote: (id: string, title: string, text: string) => Promise<void>;
  changePublicNote: (id: string, isPublic: boolean) => void;
}

const NoteBlocks: React.FC<NoteBlocksProps> = ({ notes, deleteNote, updateNote, changePublicNote }) => {
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
        return (
          <NoteBlock
            changePublicNote={changePublicNote}
            updateNote={updateNote}
            deleteNote={deleteNote}
            key={note._id}
            note={note}
          />
        );
      })}
    </Grid>
  );
};

export default NoteBlocks;
