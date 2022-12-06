import React from 'react';
import { KeyboardType, TextInputProps } from 'react-native';
import {
   Container,
   InputText
} from './styles'

interface InputType extends TextInputProps{
    keyboard: KeyboardType;
    color: string;
}

export function InputFinishTask({keyboard, color}: InputType) {
    return (
        <Container>
            <InputText
                keyboardType={keyboard}
                style={{backgroundColor: color}}          
            />            
        </Container>        
    )
}