import { Container, PatientName, Header, TaskName, Info, TimeTask } from './styles'

import { View } from 'react-native'
import { ButtonTask } from '../ButtonTask/Index'

interface HighlightTasksPops {
    data: {
        patientName: string
        task: string
        executors: string
        healthInstitution: string
        generalObservations: string
        plan: string
    }
}

export function Tasks({data}: HighlightTasksPops){
    return(
        <Container>
            <Header>
                <View style={{flexDirection: 'row'}}>
                    <PatientName>{data.patientName}</PatientName>
                    <TaskName>{data.task}</TaskName> 
                </View>

               <Info>Executor(es): {data.executors}</Info>
               <Info>Instituições: {data.healthInstitution}</Info> 
               <Info>Plano: {data.plan}</Info>
               <Info>Observações Gerais: {data.generalObservations}</Info> 

               <ButtonTask
                    title='Iniciar Atividade'
               />

                <View style={{flexDirection: 'row-reverse'}}>
                    <TimeTask>
                        17/07/2022 (Ter) 07:00
                    </TimeTask>
                </View>
            </Header>
        </Container>
    )
}