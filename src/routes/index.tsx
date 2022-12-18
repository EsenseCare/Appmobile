import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PrivateRoutes, PublicRoutes } from './app.routes';
import { useAuth } from '../hooks/auth'; 
import { Splash } from '../utils/Splash';


const Routes: React.FC = () => {
  
  const { user, loading } = useAuth();
  
  if(loading){ 
    return <Splash />
  }

  return (
    <NavigationContainer>
      {user ?  <PrivateRoutes /> : <PublicRoutes /> }
    </NavigationContainer>
  );
};

export default Routes;