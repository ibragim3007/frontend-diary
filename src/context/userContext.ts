import { createContext } from 'react';
import { UserInterface } from '../interfaces';

export const userContext = createContext<{ user: UserInterface }>({
  user: {
    _id: 'string',
    firstname: 'string',
    lastname: 'string',
    email: 'string',
    password: '',
    createdAt: new Date(),
  },
});
