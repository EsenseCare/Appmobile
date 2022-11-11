import React from 'react';
import { TextInputProps, View } from 'react-native';
import {
   Container,
   InputText
} from './styles'

export function InputFinishTask() {
    return (
        <Container>
            <InputText
                keyboardType='numeric'              
            />            
        </Container>        
    )
}