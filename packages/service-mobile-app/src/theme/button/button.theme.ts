const buttonTheme = {
  baseStyle: {
    rounded: 'xl',
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
      backgroundColor: '#F67E68',
      borderColor: '#D15842',
      borderTopWidth: 0,
      borderRightWidth: 1,
      borderLeftWidth: 1,
      borderBottomWidth: 4,
    },
    ghost: {
      _pressed: { background: 'gray.100' },
    },
  },
};

export default buttonTheme;
