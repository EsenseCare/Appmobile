import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

import { Dashboard } from "../screens/Main";
import { Login } from "../screens/Login";

export function AppRoutes(){
    return (

      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
        />
        <Stack.Screen 
         name="Login" 
         component={Login} 
        />
      </Stack.Navigator>
   
    )
}