import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { PlanetsList } from './components/PlanetsList/PlanetsList';
import "./App.css"

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Grid p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <PlanetsList />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
