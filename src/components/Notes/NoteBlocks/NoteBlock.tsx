import { Grid, Typography } from '@mui/material';
import React from 'react';
import { NoteInterface } from '../../../interfaces';
import { COLORS } from '../../../UI/colors';
import { getFullTime } from '../../helper/convertTime';

interface NoteBlockProps {
  note: NoteInterface;
}

const NoteBlock: React.FC<NoteBlockProps> = ({ note }) => {
  return (
    <Grid item style={{ backgroundColor: COLORS.landBackgroundColor, padding: 20, borderRadius: 10, marginBottom: 20 }}>
      <Grid
        item
        alignItems="cetner"
        container
        justifyContent="space-between"
        style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingBottom: 3 }}
      >
        <Typography style={{ color: '#333' }} variant="h5">
          {note.title}
        </Typography>
        <Typography variant="subtitle2">{getFullTime(note.timestamps.createdAt)}</Typography>
      </Grid>
      <Grid style={{ marginTop: 6 }} item>
        <Typography style={{ fontSize: 14, lineHeight: 1.67, wordSpacing: 2.45 }}>{note.text}</Typography>
      </Grid>
    </Grid>
  );
};

export default NoteBlock;
