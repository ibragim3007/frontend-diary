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
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import CustomSnackBar from '../../helper/CustomSnack';

interface ButtonDeleteProps {
  titleNote: string;
  idNote: string;
  deleteNote: (id: string) => Promise<void>;
}

const ButtonDelete: React.FC<ButtonDeleteProps> = ({ titleNote, idNote, deleteNote }) => {
  const [openModal, setOpenModal] = useState(false);
  const [valueTitle, setValueTitle] = useState<string>();

  const changeValueTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValueTitle(e.target.value);
  };

  const handleClickOpen = (): void => setOpenModal(true);

  const [openSnack, setOpenSnack] = React.useState(false);
  const handleCloseSnack = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') return;

    setOpenSnack(false);
  };

  const handleCloseModal = (): void => setOpenModal(false);

  const handleConfirmButton = async (): Promise<void> => {
    if (valueTitle === titleNote) {
      await deleteNote(idNote);
      setOpenModal(false);
    } else {
      setOpenSnack(true);
    }
  };
  return (
    <Grid item>
      <IconButton onClick={handleClickOpen} size="small" style={{ color: 'rgba(0,0, 0,0.2)' }} aria-label="update">
        <DeleteIcon />
      </IconButton>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To confirm your decision, type the <span style={{ fontWeight: 'bolder' }}>title</span>
          </DialogContentText>
          <DialogContentText>
            Current title: <span style={{ color: '#298429', fontWeight: 'bold' }}>{titleNote}</span>
          </DialogContentText>
          <TextField
            onChange={changeValueTitle}
            value={valueTitle}
            autoFocus
            margin="dense"
            label="Repeat title"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="space-between">
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button variant="contained" color="warning" onClick={handleConfirmButton}>
              CONFIRM
            </Button>
          </Grid>
        </DialogActions>
        <CustomSnackBar openSnackBar={openSnack} handleCloseSnackBar={handleCloseSnack} severity="error">
          Invalid data try again
        </CustomSnackBar>
      </Dialog>
    </Grid>
  );
};

export default ButtonDelete;
