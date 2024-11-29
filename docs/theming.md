# Theming and Styling Guide

## Material-UI Theme Configuration

### Color Palette
```typescript
palette: {
  primary: {
    main: '#00498B',
    light: '#00AAE9',
    dark: '#003A6F',
  },
  secondary: {
    main: '#0094D4',
    light: '#00B5FF',
    dark: '#0076A8',
  },
  error: {
    main: '#C80407',
    light: '#FF1A1D',
    dark: '#A00306',
  },
  success: {
    main: '#10B981',
    light: '#34D399',
    dark: '#059669',
  }
}
```

### Typography
```typescript
typography: {
  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: '1.875rem',
    fontWeight: 600,
    lineHeight: 1.2,
  },
  // ... other typography variants
}
```

### Component Customization
```typescript
components: {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: '8px 16px',
      }
    }
  },
  // ... other component customizations
}
```

## Styling Best Practices

### Using the `sx` Prop
```typescript
<Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    p: 3,
    bgcolor: 'background.paper',
    borderRadius: 2,
  }}
>
  {/* Component content */}
</Box>
```

### Responsive Design
```typescript
<Box
  sx={{
    width: {
      xs: '100%',
      sm: '50%',
      md: '33.33%',
    },
    p: {
      xs: 2,
      sm: 3,
      md: 4,
    },
  }}
>
  {/* Responsive content */}
</Box>
```

### Custom Components
```typescript
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));
```

## Layout Guidelines

### Spacing
- Use theme spacing units
- Maintain consistent gaps
- Follow 8px grid system

### Breakpoints
```typescript
const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};
```

### Container Widths
```typescript
<Container
  maxWidth="lg"
  sx={{
    px: {
      xs: 2,
      sm: 3,
      md: 4,
    },
  }}
>
  {/* Container content */}
</Container>
```

## Animation Guidelines

### Transitions
```typescript
const transition = {
  duration: '0.2s',
  timing: 'ease-in-out',
};

sx={{
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}}
```

### Loading States
- Use MUI's Skeleton component
- Implement smooth loading transitions
- Maintain layout stability

## Accessibility

### Color Contrast
- Ensure WCAG 2.1 compliance
- Use theme colors consistently
- Test with color blindness filters

### Focus States
```typescript
sx={{
  '&:focus-visible': {
    outline: 'none',
    boxShadow: theme => `0 0 0 2px ${theme.palette.primary.main}`,
  },
}}
```

### Screen Readers
- Use proper ARIA labels
- Implement keyboard navigation
- Test with screen readers