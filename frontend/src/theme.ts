/* eslint-disable import/no-extraneous-dependencies */
import { extendTheme } from '@chakra-ui/react';
import { StepsTheme as Steps } from 'chakra-ui-steps';

const theme = extendTheme({
  components: {
    Steps,
  },
  colors: {
    gray: {
      900: '#161618',
    },
  },
});

export default theme;
