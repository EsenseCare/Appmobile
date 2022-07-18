import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const {Navigator, Screen} = createBottomTabNavigator();

import { Dashboard } from "../screens/Main";
import { Login } from "../screens/Login";

export function AppRoutes(){
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen 
                name="Atividades"
                component={Dashboard}
            />

            <Screen 
                name="Login"
                component={Login}
            />
        </Navigator>
    )
}