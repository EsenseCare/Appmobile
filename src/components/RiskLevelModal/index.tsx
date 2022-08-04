import React from "react";
import { ScrollView, Text, View } from "react-native";
import { CloseButton, Container, ContainerRating, Content, RatingView, ReferenceData, TextTopics, TextTopicTitle } from "./styles";

interface ModalProps {
    close?: any
}

export function RiskLevelModal({close}: ModalProps){


    return(

        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>          
            <Container>            
                <Content>               
                <ScrollView>
                    <TextTopicTitle>RISCOS DO PACIENTE</TextTopicTitle>
                    <TextTopics>Alergia: Sim</TextTopics>
                    <TextTopics>Precaução de Contato: Sim</TextTopics>
                    <TextTopics>Classificação de Morse: </TextTopics>
                        <RatingView>
                            <ContainerRating>
                                <Text>Sem Risco</Text>
                                <Text>0-24</Text>
                            </ContainerRating>

                            <ContainerRating>
                                <Text>Baixo Risco</Text>
                                <Text>25-50</Text>
                            </ContainerRating>

                            <ContainerRating>
                                <Text>Alto Risco</Text>
                                <Text>&gt;=50</Text>
                            </ContainerRating>
                        </RatingView>

                    <TextTopics>Classificação de Barden:</TextTopics>
                    <RatingView>
                            <ContainerRating>
                                <Text>Sem Risco</Text>
                                <Text>&gt;=19</Text>
                            </ContainerRating>

                            <ContainerRating>
                                <Text>Baixo Risco</Text>
                                <Text>15-18</Text>
                            </ContainerRating>

                            <ContainerRating>
                                <Text>Risco Moderado</Text>
                                <Text>13-14</Text>
                            </ContainerRating>

                            <ContainerRating>
                                <Text>Alto Risco</Text>
                                <Text>{"<"}=12</Text>
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