import React, { useState } from "react";
import { View, FlatList, Text } from 'react-native'
import { ButtonSchedule } from "../../components/ButtonSchedule";
import { Tasks } from "../../components/HighlightTasks/Index";
import { MultiSelectInput } from "../../components/MultiSelectInput/Index";
import { Container, FinishAllTasks, Header } from "./styles";



interface ScheduleProps {
    key: string
    hour: string
}

export function Dashboard(){
    const [hours, setHours] = useState<ScheduleProps[]>([])

    return(
        <Container>
            <Header>
                
            </Header>
            
            <View style={
                {
                    justifyContent: 'space-between',
                    flexDirection: 'row',                    
                    alignItems: 'center',
                }}
            >
                <MultiSelectInput />        
            <FinishAllTasks>
                <Text style={{color: '#fff'}}>
                    Concluir atividades do horário
                </Text>
            </FinishAllTasks>
            </View>

            <View>
                <FlatList 
                    data={[1,2,3,4,5,6,7]}
                    renderItem={({item}) => (
                        <ButtonSchedule 
                            time={"07:00"}
                            key={item}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        
            <Tasks data={{
                    patientName: "Paciente um",
                    task: "Banho",
                    executors: "profissional01 - Cuidador(a), profissional05 - Técnico de Enfermagem",
                    healthInstitution: "Casarão teste 1",
                    plan: "12226 - Rev Março",
                    generalObservations: "Nunca utilizar água em temperatura ambiente, sempre morna ou quente",                   
                }}
                />
                <Tasks data={{
                    patientName: "Paciente dois",
                    task: "Caminhada",
                    executors: "profissional01 - Cuidador(a)",
                    healthInstitution: "Casarão teste 3",
                    plan: "12563 - Rev Março",
                    generalObservations: "Caminhada de curta duração",                   
                }}
                />
        </Container>
    )
}