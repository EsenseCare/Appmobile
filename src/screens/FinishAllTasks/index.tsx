import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Title, VerticalLine, FinishButton, CancelButton } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native';

import { ScrollView } from 'react-native-gesture-handler';
import { FinishAllTaskContainer } from '../../components/FinishAllTaskContainer';

interface FinishAllTasksProps{
    nome: string;
    descricao_atividade: string;
    protocolos: [string];
}

export function FinishAllTasks(){
    const navigate = useNavigation();
    const route = useRoute();

    const [mounted, setMounted] = useState(true);
    const [filteredTasks, setFilteredTasks] = useState<any>([]);


    useEffect(() => {
        const { filteredTasksParams } = route.params as any

        if (mounted) {
            setFilteredTasks(filteredTasksParams);
        }

        return () => {
            setMounted(false);
        };
    }, []);

    return(
        <Container>
            <Content>
                <View>
                    <Title>Concluir Atividades do Horário</Title>
                </View>

                <VerticalLine />
                
                <Text style={{ fontSize: 15, color: '#707070', margin: 12}}>
                    Confirme as atividades em 07/10/2022 16:48
                </Text>

                <ScrollView style={{marginTop: 12}}>
                    {filteredTasks.map((task: FinishAllTasksProps, index: any) => (
                        <FinishAllTaskContainer key={index} task={task} />
                    ))}
                    <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
                        <FinishButton>
                            <Text style={{color: 'white', fontSize: 16}}>Finalizar</Text>
                        </FinishButton>
                        <CancelButton onPress={() => navigate.goBack()}>
                            <Text style={{fontSize: 16}}>Cancelar</Text>
                        </CancelButton>
                    </View>
                </ScrollView>
            </Content>          
        </Container>
    )
}