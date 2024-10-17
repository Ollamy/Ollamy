import { extendTheme } from 'native-base';
import Button from 'src/theme/button/button.theme';
import Heading from 'src/theme/heading/heading.theme';
import Input from 'src/theme/input/input.theme';
import Text from 'src/theme/text/text.theme';

const customTheme = extendTheme({
  components: {
    Text,
    Input,
    Button,
    Heading,
  },
});

export default customTheme;
