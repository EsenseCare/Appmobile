import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container, Content, GoBack, Title, VerticalLine } from './styles'
import { useNavigation } from '@react-navigation/native';

export function FinishAllTasks(){
    const navigate = useNavigation(); 

    return(
        <Container>
            <Content>
                <GoBack onPress={() => navigate.navigate('Dashboard' as any)} style={{borderWidth: 3}}>
                    <Text style={{fontSize: 24}}>Voltar</Text>
                </GoBack>
                <View>
                    <Title>Concluir Atividades do Horário</Title>
                </View>
                <VerticalLine />
            </Content>
        </Container>
    )
}