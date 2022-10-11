import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import { NoteInterface } from '../../../interfaces';
import CustomSnackBar from '../../helper/CustomSnack';

interface ButtonUpdateProps {
  note: NoteInterface;
  updateNote: (id: string, title: string, text: string) => Promise<void>;
}

const ButtonUpdate: React.FC<ButtonUpdateProps> = ({ note, updateNote }) => {
  const [openModal, setOpenModal] = useState(false);

  const [valueTitleForChange, setValueTitleForChange] = useState<string>(note.title);
  const [valueTextForChange, setValueTextForChange] = useState<string>(note.text);
  const [errorTitle, setErrorTitle] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<boolean>(false);

  const changeValueTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValueTitleForChange(e.target.value);
  };

  const changeValueText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValueTextForChange(e.target.value);
  };

  const handleClickOpen = (): void => setOpenModal(true);

  const [openSnack, setOpenSnack] = React.useState(false);
  const handleCloseSnack = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') return;

    setOpenSnack(false);
  };

  const handleCloseModal = (): void => setOpenModal(false);

  const handleConfirmButton = async (): Promise<void> => {
    valueTextForChange === '' ? setErrorText(true) : valueTextForChange;
    valueTitleForChange === '' ? setErrorTitle(true) : valueTitleForChange;

    if (valueTextForChange !== '' && valueTitleForChange !== '') {
      setErrorText(false);
      setErrorTitle(false);
      await updateNote(note._id, valueTitleForChange, valueTextForChange);
      handleCloseModal();
    } else {
      setOpenSnack(true);
    }
  };
  return (
    <Grid item>
      <IconButton
        onClick={handleClickOpen}
        style={{ color: 'rgba(100,100, 100,0.8)' }}
        size="small"
        aria-label="delete"
      >
        <EditIcon />
      </IconButton>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Update Note</DialogTitle>
        <DialogContent>
          <TextField
            style={{ marginTop: 10 }}
            label="Title"
            size="small"
            value={valueTitleForChange}
            onChange={changeValueTitle}
            fullWidth
            error={errorTitle}
            helperText="The field can't be empty"
          />
          <TextField
            style={{ marginTop: 20 }}
            label="Description"
            size="small"
            value={valueTextForChange}
            onChange={changeValueText}
            fullWidth
            multiline
            error={errorText}
            helperText="The field can't be empty"
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

export default ButtonUpdate;
