import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading'
import { PrivateRoutes, PublicRoutes } from './app.routes';
import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if(loading){
    //
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      {user ?  <PrivateRoutes /> : <PublicRoutes /> }
    </NavigationContainer>
  );
};

export default Routes;