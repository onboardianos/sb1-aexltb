import React from 'react';
import {
  FormControl,
  Select as MuiSelect,
  MenuItem,
  SelectProps as MuiSelectProps,
  InputAdornment,
} from '@mui/material';
import { LucideIcon } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<MuiSelectProps, 'onChange'> {
  options: SelectOption[];
  icon?: LucideIcon;
  onChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  icon: Icon,
  ...props
}) => {
  return (
    <FormControl size="small">
      <MuiSelect
        value={value}
        onChange={(e) => onChange(e.target.value as string)}
        startAdornment={
          Icon && (
            <InputAdornment position="start">
              <Icon className="w-5 h-5" />
            </InputAdornment>
          )
        }
        sx={{
          '& .MuiSelect-select': {
            pl: Icon ? 0 : 2,
            py: 1.5,
            pr: 4,
          },
          minWidth: 150,
        }}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};