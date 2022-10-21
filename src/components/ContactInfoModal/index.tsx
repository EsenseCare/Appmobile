import React from "react";
import { View } from "react-native";
import { Container, InfoView, ModalContent, Informations, VerticalLine, Title } from './styles'

interface ModalProps {
    close: any;    
    data?: [{
        name: string
        phoneNumber: number
    }]
}

export function ContactInfo({close, data}: ModalProps) {  
    return(
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>   
            <Container 
                onPress={close}
                activeOpacity={1}          
            >            
                <ModalContent>
                    <Title>Informações Para Contato</Title>         
                        <InfoView>
                            <Informations>SAMU</Informations> 
                            <VerticalLine />
                            <Informations style={{marginRight: 18}}>(19) 9999-9999</Informations>
                        </InfoView>      
                </ModalContent>
            </Container>
        </View>   
    )
}