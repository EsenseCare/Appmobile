import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dashboard } from '../screens/Main';
import { Login } from '../screens/Login';
import { FinishAllTasks } from '../screens/FinishAllTasks';

const Stack = createNativeStackNavigator();

export const PublicRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);

export const PrivateRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Dashboard"
  >
    <Stack.Screen name="Dashboard" component={Dashboard}/>
    <Stack.Screen name='FinishAllTasks' component={FinishAllTasks} />
  </Stack.Navigator>
);