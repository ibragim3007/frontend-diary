import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import { Grid, IconButton } from '@mui/material';
import React from 'react';
import { NoteInterface } from '../../../interfaces';

interface PublicButtonProps {
  changePublicNote: (id: string, isPublic: boolean) => void;
  note: NoteInterface;
}

const PublicButton: React.FC<PublicButtonProps> = ({ note, changePublicNote }) => {
  const handlerChangePublicButton = (): void => {
    changePublicNote(note._id, note.isPublic);
  };

  return (
    <Grid item onClick={handlerChangePublicButton}>
      <IconButton style={{ cursor: 'pointer', color: 'rgba(100,100, 100,0.8)' }}>
        {note.isPublic ? <PublicIcon /> : <PublicOffIcon />}
      </IconButton>
    </Grid>
  );
};

export default PublicButton;
