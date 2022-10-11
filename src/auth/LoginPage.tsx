import { Alert, Button, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { API_LOCAL, TITLE } from '../config';
import { FieldInterface, TokenResult } from '../interfaces';
import { links } from '../router/routerConfig';
import { COLORS } from '../UI/colors';
import InputField from '../UI/InputField';

interface FieldsForLoginI {
  email: FieldInterface;
  password: FieldInterface;
}

const fieldsForLogin: FieldsForLoginI = {
  email: {
    value: '',
    error: false,
    helpertext: '',
  },
  password: {
    value: '',
    error: false,
  },
};

interface LoginPageProps {
  mode: 'dark' | 'light';
}

const LoginPage: React.FC<LoginPageProps> = ({ mode }) => {
  const [fieldsValues, setFieldsValues] = useState<FieldsForLoginI>(fieldsForLogin);
  const handlerChangeFieldValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFieldsValues({ ...fieldsValues, [e.target.id]: { value: e.target.value } });
  };
  const [isIncorrectData, setIsIncorrectData] = useState(false);

  const onLoginButtonClick = async (): Promise<void> => {
    if (fieldsValues.email.value && fieldsValues.password.value) {
      try {
        const answer = await axios.post<TokenResult>(`${API_LOCAL}/api/auth/login`, {
          email: fieldsValues.email.value,
          password: fieldsValues.password.value,
        });
        if (answer.data.message === 'incorrect') {
          setIsIncorrectData(true);
          return;
        } else if (answer.data.token) {
          localStorage.setItem('token', answer.data.token);
          window.location.reload();
        }
      } catch (e) {
        console.error(e);
      }
    }
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
          <Grid spacing={3} direction="column" container>
            <Grid alignItems="center" direction="column" container item>
              <Typography variant="h4">Login to {TITLE}</Typography>
              <NavLink to={links.registration} style={{ color: '#999' }}>
                <Typography variant="subtitle1">First time here?</Typography>
              </NavLink>
            </Grid>
            <Grid item>
              <InputField
                id="email"
                type="email"
                value={fieldsValues.email.value}
                handlerChangeValue={handlerChangeFieldValue}
                label="Email"
              />
            </Grid>
            <Grid item>
              <InputField
                id="password"
                type="password"
                value={fieldsValues.password.value}
                handlerChangeValue={handlerChangeFieldValue}
                label="Password"
              />
            </Grid>
            <Grid item>{isIncorrectData && <Alert severity="error">Error email or password</Alert>}</Grid>
            <Grid item container justifyContent="space-between">
              <Grid item>
                <Button size="small">Forget password</Button>
              </Grid>
              <Grid item>
                <Button onClick={onLoginButtonClick} size="small" variant="contained">
                  Log In
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default LoginPage;
