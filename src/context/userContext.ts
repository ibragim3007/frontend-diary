import { createContext } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserInterface } from '../interfaces';

export const userContext = createContext<{ user: UserInterface | null }>({
  user: {
    _id: 'string',
    firstname: 'string',
    lastname: 'string',
    email: 'string',
    password: '',
    createdAt: new Date(),
  },
});
