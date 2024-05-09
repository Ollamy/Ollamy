const buttonTheme = {
  baseStyle: {
    py: 3,
    _text: {
      fontWeight: 700,
      color: 'white',
    },
  },
  defaultProps: {
    size: 'lg',
    variant: 'default',
  },
  variants: {
    default: {
      rounded: 'xl',
      backgroundColor: '#F67E68',
      borderColor: '#D15842',
      borderTopWidth: 0,
      borderRightWidth: 1,
      borderLeftWidth: 1,
      borderBottomWidth: 4,
    },
    yellow: {
      backgroundColor: '#F6AE2D',
      borderRadius: '5px',
      _pressed: { backgroundColor: '#FFCE75' },
      _text: {
        fontWeight: 700,
        color: 'white',
      },
    },
    secondary: {
      backgroundColor: '#F5F7FB',
      borderColor: '#D3D3D3',
      borderWidth: '1px',
      borderRadius: '5px',
      _pressed: { backgroundColor: '#FFFFFF' },
      _text: {
        fontWeight: 700,
        color: '#758EE9',
      },
    },
    ghost: {
      _pressed: { background: 'gray.100' },
    },
  },
};

export default buttonTheme;
