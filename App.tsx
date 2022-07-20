
import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';
import {AppRoutes} from './src/routes/app.routes'

import theme from './src/global/styles/theme';
import {NavigationContainer} from '@react-navigation/native'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import { Dashboard } from './src/screens/Main';
import { Login } from './src/screens/Login';


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontsLoaded){

    return(
    <AppLoading    
      
    />) 
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Login/>
      </NavigationContainer>   
    </ThemeProvider>
  )   
}


function cacheResourcesAsync() {
  throw new Error('Function not implemented.');
}
