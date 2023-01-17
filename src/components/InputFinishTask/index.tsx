import React from 'react';
import { KeyboardType, TextInputProps } from 'react-native';
import {
   Container,
   InputText
} from './styles'

interface InputType extends TextInputProps{
    keyboard: KeyboardType;
    color: string;
    onChangeFunction: (text: string) => void;
}

export function InputFinishTask({keyboard, color, onChangeFunction}: InputType) {
    return (
        <Container>
            <InputText        
                keyboardType={keyboard}
                style={{backgroundColor: color}} 
                onChangeText={(text) => onChangeFunction(text)} 
            />            
        </Container>        
    )
}