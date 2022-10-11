import { Button, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { API_LOCAL, TITLE } from '../config';
import { FieldInterface, TokenResult } from '../interfaces';
import { links } from '../router/routerConfig';
import { COLORS } from '../UI/colors';
import InputField from '../UI/InputField';

interface FieldsForLoginI {
  email: FieldInterface;
  firstname: FieldInterface;
  lastname: FieldInterface;
  password: FieldInterface;
  repeatPassword: FieldInterface;
}

const fieldsForLogin: FieldsForLoginI = {
  email: {
    value: '',
    error: false,
    helpertext: '',
  },
  firstname: {
    value: '',
    error: false,
  },
  lastname: {
    value: '',
    error: false,
  },
  password: {
    value: '',
    error: false,
  },
  repeatPassword: {
    value: '',
    error: false,
  },
};

interface RegisterPageProps {
  mode: 'light' | 'dark';
}

const RegisterPage: React.FC<RegisterPageProps> = ({ mode }) => {
  const [fieldsValues, setFieldsValues] = useState<FieldsForLoginI>(fieldsForLogin);
  const handlerChangeFieldValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFieldsValues({ ...fieldsValues, [e.target.id]: { value: e.target.value } });
  };

  const [loadingRegisterButton, setLoadingRegisterButton] = useState<boolean>(false);
  const onRegisterButtonClick = async (): Promise<void> => {
    if (fieldsValues.email.value && fieldsValues.password.value) {
      try {
        setLoadingRegisterButton(true);
        console.log(fieldsValues);
        const answer = await axios.post<TokenResult>(`${API_LOCAL}/api/auth/register`, {
          email: fieldsValues.email.value,
          firstname: fieldsValues.firstname.value,
          lastname: fieldsValues.lastname.value,
          password: fieldsValues.password.value,
        });

        if (answer.data.message === 'user is exist') {
          setFieldsValues({
            ...fieldsValues,
            email: { ...fieldsValues.email, helpertext: 'Email is exist', error: true },
          });
        } else if (answer.data.token) {
          localStorage.setItem('token', answer.data.token);
          window.location.reload();
        }
      } catch (e) {
        console.log(e);
      }
    }
    setLoadingRegisterButton(false);
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        height: '100vh',
        backgroundColor: mode === 'light' ? COLORS.backgroundColor : COLORS.backgroundColorDark,
      }}
    >
      <Paper>
        <Grid
          item
          style={{
            width: 'clamp(300px, 60vw, 400px)',
            padding: '30px 20px',
            borderRadius: 5,
          }}
        >
          <Grid spacing={2} direction="column" container>
            <Grid alignItems="center" direction="column" container item>
              <Typography variant="h4">Welcome to {TITLE}</Typography>
              <NavLink to={links.login} style={{ color: '#999' }}>
                <Typography variant="subtitle1">Already Sign Up?</Typography>
              </NavLink>
            </Grid>
            <Grid item>
              <InputField
                id="email"
                type="email"
                value={fieldsValues.email.value}
                error={fieldsValues.email.error}
                handlerChangeValue={handlerChangeFieldValue}
                helperText={fieldsValues.email.helpertext}
                label="Enter your Email"
              />
            </Grid>
            <Grid spacing={2} container direction="row" item>
              <Grid xs item>
                <InputField
                  id="firstname"
                  type="text"
                  value={fieldsValues.firstname.value}
                  error={fieldsValues.firstname.error}
                  handlerChangeValue={handlerChangeFieldValue}
                  label="Your firstname"
                />
              </Grid>
              <Grid xs item>
                <InputField
                  id="lastname"
                  type="text"
                  value={fieldsValues.lastname.value}
                  error={fieldsValues.lastname.error}
                  handlerChangeValue={handlerChangeFieldValue}
                  label="Your lastname"
                />
              </Grid>
            </Grid>
            <Grid item>
              <InputField
                id="password"
                type="password"
                value={fieldsValues.password.value}
                error={fieldsValues.password.error}
                handlerChangeValue={handlerChangeFieldValue}
                label="Enter password"
              />
            </Grid>
            <Grid item>
              <InputField
                id="repeatPassword"
                type="password"
                value={fieldsValues.repeatPassword.value}
                error={fieldsValues.repeatPassword.error}
                handlerChangeValue={handlerChangeFieldValue}
                label="Repeat password"
              />
            </Grid>
            <Grid item container justifyContent="space-between">
              <Grid item>
                <Button size="small">Forget password</Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={onRegisterButtonClick}
                  size="small"
                  disabled={loadingRegisterButton}
                  variant="contained"
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default RegisterPage;
