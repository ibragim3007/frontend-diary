import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
} from '@mui/material';
import React, { useState } from 'react';

interface ButtonDeleteProps {
  titleNote: string;
  idNote: string;
  deleteNote: (id: string) => Promise<void>;
}

const ButtonDelete: React.FC<ButtonDeleteProps> = ({ titleNote, idNote, deleteNote }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClickOpen = (): void => setOpenModal(true);

  const handleCloseModal = (): void => setOpenModal(false);

  const handleConfirmButton = async (): Promise<void> => {
    await deleteNote(idNote);
    setOpenModal(false);
  };
  return (
    <Grid item>
      <IconButton
        onClick={handleClickOpen}
        size="small"
        style={{ color: 'rgba(100,100, 100,0.8)' }}
        aria-label="update"
      >
        <DeleteIcon />
      </IconButton>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          Are you sure you want to <span style={{ color: '#E74C3C' }}>delete?</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To confirm your decision press <span style={{ color: '#239B56' }}>OK</span>
          </DialogContentText>
          <DialogContentText>
            Current title: <span style={{ color: '#298429', fontWeight: 'bold' }}>{titleNote}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid style={{ margin: 10 }} container justifyContent="space-between">
            <Button variant="contained" color="info" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="outlined" color="success" onClick={handleConfirmButton}>
              Ok
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ButtonDelete;
