import { Container, PatientName, Header, TaskName, Info, TimeTask } from './styles'

import { View } from 'react-native'
import { ButtonTask } from '../ButtonTask/Index'

interface HighlightTasksProps {
    data: {
        patientName: string
        taskName: string
        executors: string
        institutionName: string
        generalObservations: string
        planType: string
        time: string
        started: boolean
    }
}

export function TasksList({data}: HighlightTasksProps){

    return(
        <Container>
            <Header>
                <View style={{flexDirection: 'row'}}>
                    <PatientName>{data.patientName}</PatientName>
                    <TaskName>{data.taskName}</TaskName> 
                </View>

               <Info>Executor(es): {data.executors}</Info>
               <Info>Instituições: {data.institutionName}</Info> 
               <Info>Plano: {data.planType}</Info>
               <Info>Observações Gerais: {data.generalObservations}</Info> 

               <ButtonTask
                    title={data.started ? 'Finalizar Atividade' : 'Iniciar Atividade'}
               />

                <View style={{flexDirection: 'row-reverse'}}>
                    <TimeTask>
                        {data.time}
                    </TimeTask>
                </View>
            </Header>
        </Container>
    )
}