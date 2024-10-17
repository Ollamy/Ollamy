const inputTheme = {
  defaultProps: {
    size: 'lg',
    variant: 'default',
    p: '10px',
  },
  sizes: {
    lg: {
      fontSize: '16px',
      p: 10,
    },
  },
  variants: {
    default: {
      rounded: 5,
      padding: 10,
      borderWidth: 1,
      bg: '#FFFFFF',
      borderColor: '#021E2E19',
      _focus: {
        borderColor: '#876BF6',
      },
    },
  },
};

export default inputTheme;
