import React from 'react';
import { ThemeProvider } from 'styled-components';
import { usePreventScreenCapture } from 'expo-screen-capture'

import theme from './src/global/styles/theme';

import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  "Overwriting fontFamily style attribute preprocessor"
]);

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import { AuthProvider } from './src/hooks/auth';
import Routes from './src/routes';
import { Splash } from './src/utils/Splash';

export default function App() {
  usePreventScreenCapture();
  
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontsLoaded){
    return(
      <Splash />
    )   
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>       
            <Routes />      
        </AuthProvider>      
    </ThemeProvider>
  )   
}
