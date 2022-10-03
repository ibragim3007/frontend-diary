import { Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { API_LOCAL, TITLE } from '../config';
import { links } from '../router/routerConfig';
import InputField from '../UI/InputField';

interface FieldInterface {
  value: string;
  error: boolean;
}

interface FieldsForLoginI {
  email: FieldInterface;
  password: FieldInterface;
}

const fieldsForLogin: FieldsForLoginI = {
  email: {
    value: '',
    error: false,
  },
  password: {
    value: '',
    error: false,
  },
};

const LoginPage: React.FC = () => {
  const [fieldsValues, setFieldsValues] = useState<FieldsForLoginI>(fieldsForLogin);
  const handlerChangeFieldValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFieldsValues({ ...fieldsValues, [e.target.id]: { value: e.target.value } });
  };

  const onLoginButtonClick = async (): Promise<void> => {
    if (fieldsValues.email.value && fieldsValues.password.value) {
      try {
        const answer = await axios.post(`${API_LOCAL}/api/auth/login`, {
          email: fieldsValues.email.value,
          password: fieldsValues.password.value,
        });
        console.log(answer.status);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh', backgroundColor: '#110746' }}>
      <Grid
        item
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          width: 'clamp(300px, 60vw, 400px)',
          padding: '30px 20px',
          borderRadius: 5,
        }}
      >
        <Grid spacing={3} direction="column" container>
          <Grid alignItems="center" direction="column" container item>
            <Typography variant="h4">Login to {TITLE}</Typography>
            <NavLink to={links.registration}>
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
    </Grid>
  );
};

export default LoginPage;
