import React from 'react';
import { styled } from '@mui/material/styles';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 20,
  height: 20,
  marginLeft: '4px',
  border: `2px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[300]}`,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#ffffff',
  transition: 'all 0.2s ease-in-out',

  '.Mui-focusVisible &': {
    outline: `2px auto ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(93, 135, 255, 0.1)',
  },
  'input:disabled ~ &': {
    borderColor: theme.palette.grey[300],
    backgroundColor: theme.palette.grey[100],
    opacity: 0.5,
  },
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.main,
  width: 20,
  height: 20,
  '&:before': {
    display: 'block',
    width: 20,
    height: 20,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
    backgroundSize: '12px 12px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    borderColor: theme.palette.primary.dark,
  },
}));

// Use React.forwardRef to forward the ref
const CustomCheckbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(function CustomCheckbox(props, ref) {
  return (
    <Checkbox
      disableRipple
      color="primary"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      ref={ref}
      {...props}
    />
  );
});

export default CustomCheckbox;