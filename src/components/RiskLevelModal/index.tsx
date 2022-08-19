import React from "react";
import { ScrollView, Text, View } from "react-native";
import { AllergyPanel, CloseButton, Container, ContainerRating, Content, RatingView, ReferenceData, TextTopics, TextTopicTitle } from "./styles";

interface ModalProps {
    close?: any
    item: any;
}

export function RiskLevelModal({close, item}: ModalProps){

    return(      
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>          
            <Container>            
                <Content>               
                <ScrollView>
                    <TextTopicTitle>RISCOS DO PACIENTE</TextTopicTitle>
                    <TextTopics>Alergia: Sim</TextTopics>
                        <AllergyPanel>
                            <Text>{'\u2022'} alergia1</Text>
                            <Text>{'\u2022'} alergia2</Text>
                            <Text>{'\u2022'} alergia3</Text>
                        </AllergyPanel>
                    <TextTopics>Precaução de Contato: Sim</TextTopics>
                    <TextTopics>Classificação de Morse: </TextTopics>
                        <RatingView>
                            <ContainerRating bgColor={item.levelRiskMorse === "NoRisk" ? '#1bad1c' : 'white'}>
                                <Text 
                                style={{color: item.levelRiskMorse === "NoRisk" ? 'white' : 'black'}}>
                                    Sem Risco
                                </Text>
                                <Text
                                style={{color: item.levelRiskMorse === "NoRisk" ? 'white' : 'black'}}
                                    >25-50
                                </Text>
                            </ContainerRating>

                            <ContainerRating bgColor={item.levelRiskMorse === "Medium" ? '#ffcd30' : 'white'}>
                                <Text style={{color: item.levelRiskMorse === "Medium" ? 'white' : 'black'}}>
                                    Baixo Risco
                                </Text>
                                <Text
                                style={{color: item.levelRiskMorse === "Medium" ? 'white' : 'black'}}
                                    >25-50
                                </Text>
                            </ContainerRating>

                            <ContainerRating bgColor={item.levelRiskMorse === "High" ? '#f75c48' : 'white'}>
                                <Text style={{color: item.levelRiskMorse === "High" ? 'white' : 'black'}}>
                                    Alto Risco
                                </Text>
                                <Text
                                style={{color: item.levelRiskMorse === "High" ? 'white' : 'black'}}>
                                    &gt;=50
                                </Text>
                            </ContainerRating>
                        </RatingView>

                    <TextTopics>Classificação de Barden:</TextTopics>
                    <RatingView>
                            <ContainerRating bgColor={item.levelRiskBarden === "NoRisk" ? '#1bad1c' : 'white'}>
                                <Text
                                style={{color: item.levelRiskBarden === "NoRisk" ? 'white' : 'black'}}>
                                    Sem Risco
                                </Text>
                                <Text
                                style={{color: item.levelRiskBarden === "NoRisk" ? 'white' : 'black'}}>
                                    &gt;=19
                                </Text>
                            </ContainerRating>

                            <ContainerRating bgColor={item.levelRiskBarden === "Low" ? '#ffcd30' : 'white'}>
                            <Text
                                style={{color: item.levelRiskBarden === "Low" ? 'white' : 'black'}}>
                                    Baixo Risco
                                </Text>
                                <Text
                                style={{color: item.levelRiskBarden === "Low" ? 'white' : 'black'}}>
                                    15-18
                                </Text>
                            </ContainerRating>

                            <ContainerRating bgColor={item.levelRiskBarden === "Medium" ? '#fea500' : 'white'}>
                            <Text
                                style={{color: item.levelRiskBarden === "Medium" ? 'white' : 'black'}}>
                                    Risco Moderado
                                </Text>
                                <Text
                                style={{color: item.levelRiskBarden === "Medium" ? 'white' : 'black'}}>
                                    13-14
                                </Text>
                            </ContainerRating>

                            <ContainerRating bgColor={item.levelRiskBarden === "High" ? '#f75c48' : 'white'}>
                                <Text
                                    style={{color: item.levelRiskBarden === "High" ? 'white' : 'black'}}>
                                        Alto Risco
                                    </Text>
                                    <Text
                                    style={{color: item.levelRiskBarden === "High" ? 'white' : 'black'}}>
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