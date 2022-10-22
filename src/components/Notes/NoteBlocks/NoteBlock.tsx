import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NoteInterface } from '../../../interfaces';
import { getFullTime } from '../../helper/convertTime';
import ButtonDelete from './ButtonDelete';
import ButtonUpdate from './ButtonUpdate';
import PublicButton from './PublicButton';

interface NoteBlockProps {
  note: NoteInterface;
  deleteNote: (id: string) => Promise<void>;
  updateNote: (id: string, title: string, text: string) => Promise<void>;
  changePublicNote: (id: string, isPublic: boolean) => void;
}

const NoteBlock: React.FC<NoteBlockProps> = ({ note, deleteNote, updateNote, changePublicNote }) => {
  return (
    <Paper>
      <Grid style={{ padding: 20, borderRadius: 10 }}>
        <Grid
          alignItems="center"
          container
          justifyContent="space-between"
          style={{
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            paddingBottom: 3,
            height: 'fit-content',
          }}
        >
          <Typography variant="h5">{note.title}</Typography>
          <Typography variant="subtitle1" style={{ color: '#888', fontSize: 12, fontStyle: 'italic' }}>
            {getFullTime(note.timestamps.createdAt)}
          </Typography>
        </Grid>
        <Grid style={{ marginTop: 6 }} item>
          <Typography style={{ fontSize: 14, lineHeight: 1.67, wordSpacing: 2.45 }}>{note.text}</Typography>
        </Grid>
        <Grid alignContent="flex-end" container justifyContent="space-between" style={{ marginTop: 5 }}>
          <PublicButton note={note} changePublicNote={changePublicNote} />
          <Grid item>
            <Grid container>
              <ButtonDelete deleteNote={deleteNote} idNote={note._id} titleNote={note.title} />
              <ButtonUpdate updateNote={updateNote} note={note} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NoteBlock;
