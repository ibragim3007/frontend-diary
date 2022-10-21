import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button, Grid, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';
import { API_LOCAL } from '../../../config';
import { usePostHttp } from '../../../hooks/post.http.hook';
import { NoteInterface } from '../../../interfaces';
import MainText from './MainText';
import SubText from './SubText';

interface AddNoteField {
  value: string;
  error?: boolean;
  helperText?: string;
}

interface AddNewNoteProps {
  addNewNotes: (note: NoteInterface) => void;
}

const AddNewNote: React.FC<AddNewNoteProps> = ({ addNewNotes }) => {
  const [titleValue, setTitleValue] = useState<AddNoteField>({
    value: '',
    error: false,
  });
  const [descriptionValue, setDescriptionValue] = useState<AddNoteField>({
    value: '',
    error: false,
  });

  const handlerChangeValueTitle = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setTitleValue({ ...titleValue, value: e.target.value });

  const handlerChangeValueDescription = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setDescriptionValue({ ...descriptionValue, value: e.target.value });

  const { request, loading } = usePostHttp<NoteInterface>(`${API_LOCAL}/api/note/add`);

  const ClickButtonAddNewNote = async (): Promise<void> => {
    if (titleValue.value === '') {
      setTitleValue({ ...titleValue, error: true, helperText: 'Fill in the field' });
      return;
    } else setTitleValue({ ...titleValue, error: false });

    if (descriptionValue.value === '') {
      setDescriptionValue({ ...descriptionValue, error: true, helperText: 'Fill in the field' });
      return;
    } else setDescriptionValue({ ...descriptionValue, error: false });

    const dataForSend = {
      title: titleValue.value,
      text: descriptionValue.value,
    };
    const result = await request(dataForSend);

    setTitleValue({ ...titleValue, value: '' });
    setDescriptionValue({ ...descriptionValue, value: '' });
    if (result) {
      addNewNotes(result);
    }
  };

  return (
    <Paper>
      <Grid style={{ padding: 20, margin: 'auto', borderRadius: 10, maxWidth: 1920 }}>
        <Grid wrap="wrap" spacing={3} container>
          <Grid lg={4} md={5} item>
            <MainText>Title of the day</MainText>
            <SubText>Describe in a few words</SubText>
            <TextField
              onChange={handlerChangeValueTitle}
              value={titleValue.value}
              error={titleValue.error}
              helperText={titleValue.helperText}
              variant="filled"
              size="small"
              label="Title"
              fullWidth
            />
          </Grid>
          <Grid lg={8} md={7} item>
            <MainText> Table of contents of the day</MainText>
            <SubText>
              Write what you think or what happend todat! Everything written here will remain confidential
            </SubText>
            <TextField
              onChange={handlerChangeValueDescription}
              value={descriptionValue.value}
              error={descriptionValue.error}
              helperText={descriptionValue.helperText}
              label="Description"
              variant="filled"
              size="small"
              rows={5}
              multiline
              fullWidth
            />
          </Grid>
          <Grid container justifyContent="flex-end" item>
            <Button onClick={ClickButtonAddNewNote} disabled={loading} variant="outlined" startIcon={<AddBoxIcon />}>
              Add new note
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddNewNote;
