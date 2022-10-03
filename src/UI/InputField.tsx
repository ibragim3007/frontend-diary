import { InputAdornment, SvgIconTypeMap, TextField } from '@mui/material';
import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  handlerChangeValue(e: React.ChangeEvent<HTMLInputElement>): void;

  error?: boolean;
  fullWidth?: boolean;
  type?: string;
  icon?: SvgIconTypeMap;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  value,
  handlerChangeValue,
  type = 'text',
  error,
  id,
  fullWidth = true,
}) => {
  return icon ? (
    <TextField
      id={id}
      size="small"
      fullWidth={fullWidth}
      label={label}
      value={value}
      onChange={handlerChangeValue}
      type={type}
      error={error}
      InputProps={{
        startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
      }}
    />
  ) : (
    <TextField
      id={id}
      error={error}
      size="small"
      type={type}
      fullWidth={fullWidth}
      label={label}
      value={value}
      onChange={handlerChangeValue}
    />
  );
};

export default InputField;
