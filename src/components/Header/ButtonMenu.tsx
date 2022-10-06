import React from 'react';
import { Button } from '@mui/material';
import { COLORS } from '../../UI/colors';

interface ButtonMenuProps {
  children: React.ReactChild | React.ReactNode;
}

const ButtonMenu: React.FC = ({ children }) => {
  return <Button style={{ color: COLORS.backgroundColor, fontSize: 20 }}>{children}</Button>;
};

export default ButtonMenu;
