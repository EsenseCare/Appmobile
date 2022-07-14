import React from "react";

import { View, TextInputProps } from 'react-native'
import { Container, InputLogin } from "./styles";

import AntDesign from 'react-native-vector-icons/AntDesign'


interface InputProps extends TextInputProps{
    iconType: string
    placeHolderText: string
    passwordMask: boolean  
}

export const FormInput = ({placeHolderText, iconType, passwordMask}: InputProps) => {
    return (
        <Container> 
            <View>
                <AntDesign name={iconType} size={25} color="#667" />
            </View>
            <InputLogin
                numberOfLines={1}            
                placeholder={placeHolderText}
                secureTextEntry={passwordMask}
            />
        </Container>
    )
}