import React from 'react';
import { View, Image } from 'react-native';
import { ThemeProvider } from 'styled-components';
//import {AppRoutes} from './src/routes/app.routes'
import { usePreventScreenCapture } from 'expo-screen-capture'

import theme from './src/global/styles/theme';
import {NavigationContainer} from '@react-navigation/native'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import { AuthProvider } from './src/hooks/auth';
import Routes from './src/routes';

export default function App() {
  usePreventScreenCapture();
  const auth = true;

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });


  if(!fontsLoaded){
    return(
      <View style={{flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <Image 
          source={require('./assets/loading-gif.gif')}  
          style={{width: 185, height:150, alignSelf:'center'}} 
        />
      </View>
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
