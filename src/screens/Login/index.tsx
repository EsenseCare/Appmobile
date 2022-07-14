import React from "react";
import { Container, ContainerTwo, GreetingsText, HelpButtonSingUp, HelpButtonPassword, LogoImg } from './styles'

import { FormInput } from "../../components/InputText/Index";
import { ButtonLog } from "../../components/ButtonLogin/Index";

import Logo from '../../../assets/logo-esense.png'
import { Text, View } from "react-native";


export function Login(){  

    return(
        <Container>
        <ContainerTwo >
            <LogoImg source={Logo}/>

            <GreetingsText>
                Faça o login para continuar
            </GreetingsText>
            <FormInput
                iconType="user"             
                placeHolderText="Email"
                keyboardType="email-address"
                passwordMask={false}
                
            />
            <FormInput
                iconType="key"             
                placeHolderText="Senha"
                passwordMask
                
            />
                <HelpButtonPassword onPress={() => ({})} >
                    Esqueceu a senha?
                </HelpButtonPassword>

            <ButtonLog
                title="Login"
            />                                    
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 24}}>
                    <Text style={{fontSize: 16, marginTop: 18}}>
                        Nao tem uma conta?    
                    </Text>
                    <HelpButtonSingUp onPress={() => ({})} >
                        Cadastre-se
                    </HelpButtonSingUp>
                </View>
                                 
        </ContainerTwo>
        </Container>      
    )
}


