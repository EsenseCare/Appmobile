import React from 'react';
import { TextInputProps, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
    InputText,
    Container,
    Error
 
} from './styles'

export interface Props extends TextInputProps{
    iconType: string;
    placeHolderText: string;
}

export function Input({iconType, placeHolderText, ...rest} : Props) {
    return (
        <Container>
            <View >
                <AntDesign name={iconType} size={25} color="#667" />                                                         
            </View>
            <InputText              
                iconType={iconType} 
                placeHolderText={placeHolderText} 
                placeholder={placeHolderText}
                {...rest}
            /> 
            
            
        </Container>
        
    )
}