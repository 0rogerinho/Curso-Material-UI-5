import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';
import React from 'react';

type IVTextField = TextFieldProps & {
  name: string;
};

export const VTextField = ({ name, ...props }: IVTextField) => {
  const { clearError, defaultValue, error, fieldName, registerField } =
    useField(name);

  const [value, setValue] = React.useState(defaultValue || '');

  React.useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField
      {...props}
      error={!!error}
      value={value}
      helperText={error}
      defaultValue={defaultValue}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange?.(e);
      }}
      onKeyDown={(e) => {
        error ? clearError() : undefined;
        props.onKeyDown?.(e);
      }}
    />
  );
};
