const inputTheme = {
  baseStyle: {},
  defaultProps: {
    size: 'lg',
    variant: 'default',
  },
  variants: {
    default: {
      px: 4,
      py: 3,
      rounded: 12,
      borderWidth: 2,
      bg: '#F7F7F7',
      borderColor: '#C7C7C7',
      fontWeight: 600,
      _focus: {
        bg: '#F7F7F7',
        borderColor: '#F67E68',
      },
    },
  },
};

export default inputTheme;
