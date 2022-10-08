import { Grid, Typography } from '@mui/material';
import React from 'react';
import { NoteInterface } from '../../../interfaces';
import { COLORS } from '../../../UI/colors';
import { getFullTime } from '../../helper/convertTime';
import ButtonDelete from './ButtonDelete';
import ButtonUpdate from './ButtonUpdate';

interface NoteBlockProps {
  note: NoteInterface;
  deleteNote: (id: string) => Promise<void>;
}

const NoteBlock: React.FC<NoteBlockProps> = ({ note, deleteNote }) => {
  return (
    <Grid style={{ border: '2px dashed rgba(255, 255, 255, 0.3)', borderRadius: 10 }}>
      <Grid item style={{ backgroundColor: COLORS.landBackgroundColor, padding: 20, borderRadius: 10 }}>
        <Grid
          item
          alignItems="cetner"
          container
          justifyContent="space-between"
          style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingBottom: 3, height: 'fit-content' }}
        >
          <Typography style={{ color: '#333' }} variant="h5">
            {note.title}
          </Typography>
          <Typography variant="subtitle1" style={{ color: '#888', fontSize: 12, fontStyle: 'italic' }}>
            {getFullTime(note.timestamps.createdAt)}
          </Typography>
        </Grid>
        <Grid container alignSelf="flex-end">
          <Grid style={{ marginTop: 6 }} item>
            <Typography style={{ fontSize: 14, lineHeight: 1.67, wordSpacing: 2.45 }}>{note.text}</Typography>
          </Grid>
          <Grid
            style={{ marginTop: 5, height: '100%' }}
            spacing={1}
            container
            justifyContent="flex-end"
            alignContent="flex-end"
            item
          >
            <ButtonDelete deleteNote={deleteNote} idNote={note._id} titleNote={note.title} />
            <ButtonUpdate />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NoteBlock;