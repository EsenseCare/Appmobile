import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import api from "../../services/api";
import { AllergyPanel, CloseButton, Container, ContainerRating, Content, RatingView, ReferenceData, TextTopics, TextTopicTitle } from "./styles";

interface ModalProps {
    close?: any
    item: any;
    id: number;
}

interface sicknessProps{
    info:{
        type: string;
    }
}

export function RiskLevelModal({close, item, id}: ModalProps){
    const [levelRiskMorse, setLevelRiskMorse] = useState('');
    const [levelRiskBraden, setLevelRiskBraden] = useState('');
    const [alergies, setAlergies] = useState<sicknessProps[]>([]);

    useEffect(() => {
        async function fetchRisks(){
            const { data } = await api.get(`/cuidador/consultar-riscos-paciente?paciente_id=${id}`);
            setLevelRiskMorse(data.content.morse);
            setLevelRiskBraden(data.content.braden);
            setAlergies(data.content.alergias);
            console.log(data.content.alergias);
        }

        fetchRisks();
    },[]);

    return(      
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>          
            <Container>            
                <Content>               
                <ScrollView>
                    <TextTopicTitle>RISCOS DO PACIENTE</TextTopicTitle>
                    <TextTopics>Alergia: {alergies.length ? "Sim": "Não"}</TextTopics>
                       {alergies.length ? <AllergyPanel>
                        <Text>{'\u2022'} {alergies.map((item) => {
                            item.info.type
                        })}</Text>
                        </AllergyPanel>: null}
                    <TextTopics>Precaução de Contato: Sim</TextTopics>
                    <TextTopics>Classificação de Morse: </TextTopics>
                        <RatingView>
                            <ContainerRating bgColor={levelRiskMorse === "sem_risco" ? '#1bad1c' : 'white'}>
                                <Text 
                                style={{color: levelRiskMorse  === "sem_risco" ? 'white' : 'black'}}>
                                    Sem Risco
                                </Text>
                                <Text
                                style={{color: levelRiskMorse  === "sem_risco" ? 'white' : 'black'}}
                                    >25-50
                                </Text>
                            </ContainerRating>

                            <ContainerRating bgColor={levelRiskMorse   === "baixo_risco" ? '#ffcd30' : 'white'}>
                                <Text style={{color: levelRiskMorse  === "baixo_risco" ? 'white' : 'black'}}>
                                    Baixo Risco
                                </Text>
                                <Text
                                style={{color: levelRiskMorse  === "baixo_risco" ? 'white' : 'black'}}
                                    >25-50
                                </Text>
                            </ContainerRating>

                            <ContainerRating bgColor={levelRiskMorse  === "alto_risco" ? '#f75c48' : 'white'}>
                                <Text style={{color: levelRiskMorse === "alto_risco" ? 'white' : 'black'}}>
                                    Alto Risco
                                </Text>
                                <Text
                                style={{color: levelRiskMorse  === "alto_risco" ? 'white' : 'black'}}>
                                    &gt;=50
                                </Text>
                            </ContainerRating>
                        </RatingView>

                    <TextTopics>Classificação de Braden:</TextTopics>
                    <RatingView>
                            <ContainerRating bgColor={levelRiskBraden === "sem_risco" ? '#1bad1c' : 'white'}>
                                <Text
                                style={{color: levelRiskBraden === "sem_risco" ? 'white' : 'black'}}>
                                    Sem Risco
                                </Text>
                                <Text
                                style={{color: levelRiskBraden === "sem_risco" ? 'white' : 'black'}}>
                                    &gt;=19
                                </Text>
                            </ContainerRating>

                            <ContainerRating bgColor={levelRiskBraden === "baixo_risco" ? '#ffcd30' : 'white'}>
                            <Text
                                style={{color: levelRiskBraden === "baixo_risco" ? 'white' : 'black'}}>
                                    Baixo Risco
                                </Text>
                                <Text
                                style={{color: levelRiskBraden === "baixo_risco" ? 'white' : 'black'}}>
                                    15-18
                                </Text>
                            </ContainerRating>

                            <ContainerRating bgColor={levelRiskBraden === "risco_moderado" ? '#fea500' : 'white'}>
                            <Text
                                style={{color: levelRiskBraden === "risco_moderado" ? 'white' : 'black'}}>
                                    Risco Moderado
                                </Text>
                                <Text
                                style={{color: levelRiskBraden === "risco_moderado" ? 'white' : 'black'}}>
                                    13-14
                                </Text>
                            </ContainerRating>

                            <ContainerRating bgColor={levelRiskBraden === "alto_risco" ? '#f75c48' : 'white'}>
                                <Text
                                    style={{color: levelRiskBraden === "alto_risco" ? 'white' : 'black'}}>
                                        Alto Risco
                                    </Text>
                                    <Text
                                    style={{color: levelRiskBraden === "alto_risco" ? 'white' : 'black'}}>
                                        {'<'}=12
                                    </Text>
                            </ContainerRating>
                        </RatingView>
                        <View style={{justifyContent: 'space-evenly'}}>
                            <ReferenceData>
                                Dados referentes a classificação de
                            </ReferenceData>

                        <CloseButton onPress={close}>
                            <Text 
                            style={{
                                    color: 'white', fontWeight: 'bold'
                                }}>
                            Fechar
                            </Text>
                        </CloseButton>
                        </View>                 
                </ScrollView>       
                </Content>                          
            </Container>                
        </View>              
    )
}