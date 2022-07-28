import React, { useEffect, useState } from 'react';
import { Container, 
    Field, 
    GreetingsText, 
    HelpButtonSingUp, 
    HelpButtonPassword, 
    LogoImg, 
    ButtonLogin,
    Error
} from './styles';


import Logo from '../../../assets/logo-esense2.png'
import { View, Text } from 'react-native';
import { Input } from '../../components/Input';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

export function Login(){ 
 
    const [userInfo, setUserInfo] = useState({
      email: '',
      password: '',
    });
    const [error, setError] = useState('');

    const { email, password } = userInfo;
    const navigation = useNavigation();

    const handleOnChangeText = (value: any, fieldName: string) => {
        setUserInfo({ ...userInfo, [fieldName]: value });
    };

    async function submitForm() {
        if(userInfo.email === "" || userInfo.password === ""){
            return setError("Preencha os campos corretamente!");
        }
 
        const { data } = await api.get(`session`);
        data.map((item: any) => {
            if(item.email === email || item.password === password){
                navigation.navigate('Dashboard' as any)
            } else{
                return setError("Email ou senha incorretos.");
            }          
        })                  
    }

    useEffect(() => {
        if(userInfo.email.trim() !== "" || userInfo.password.trim() !== ""){
            setError('')
        }
    },[userInfo.email, userInfo.password])
    

    return(
        <Container> 
            <Field>
                <LogoImg source={Logo}/>

                <GreetingsText>
                    Faça o login para continuar
                </GreetingsText>                   
                <Input
                    value={email}
                    onChangeText={value => handleOnChangeText(value, 'email')}                                         
                    iconType="user"             
                    placeHolderText="Email"
                    keyboardType="email-address"                                                                                                                                        
                />
                   
                <Input     
                    value={password}
                    onChangeText={value => handleOnChangeText(value, 'password')}            
                    iconType="key"             
                    placeHolderText="Senha"
                    mask={true}                                                
                />
                { error ? <Error>{error}</Error>: null}
        

                <HelpButtonPassword onPress={() => ({})} >
                    Esqueceu a senha?
                </HelpButtonPassword> 

                <ButtonLogin onPress={submitForm}>
                    <Text style={{fontWeight: 'bold', color:'#ffff', fontSize: 18}}>
                        Login
                    </Text>
                </ButtonLogin>                                    
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 24}}>
                        <Text style={{fontSize: 16, marginTop: 18, color: '#435369'}}>
                            Nao tem uma conta?    
                        </Text>
                        <HelpButtonSingUp onPress={() => ({})} >
                            Cadastre-se
                        </HelpButtonSingUp> 
                    </View>
            </Field>
        </Container>      
    )
}


