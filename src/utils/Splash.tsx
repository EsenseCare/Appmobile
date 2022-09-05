import React from "react";
import { View, } from 'react-native';
import LottieView from 'lottie-react-native';

export function Splash(){
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <LottieView
                source={require("../../assets/healthcare-loader.json")}
                loop            
            />
        </View>
    )
}