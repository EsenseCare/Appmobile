import { Container, PatientName, Header, TaskName, Info, TimeTask, OpenModalContact, OpenModalRisk  } from './styles'

import { Animated, Modal, View} from 'react-native'
import { ButtonTask } from '../ButtonTask/Index'
import { ContactInfo } from '../ContactInfoModal'
import React, { useState } from 'react'
import { RiskLevelModal } from '../RiskLevelModal'



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
    const [modalContactVisible, setModalContactVisible] = useState(false);
    const [modalRiskVisible, setModalRiskVisible] = useState(false);


    return(
        <Container>
            <Header>
                <View style={{flexDirection: 'row-reverse'}}>
                    <TimeTask>
                        {data.time}
                    </TimeTask>
                </View>
                
                <View style={{flexDirection: 'row'}}>
                    <PatientName>{data.patientName}</PatientName>
                    <TaskName>{data.taskName}</TaskName>
                    <OpenModalRisk
                        onPress={() => setModalRiskVisible(true)}>
                        Paciente de risco
                    </OpenModalRisk> 
                    
                </View>

               <Info>Executor(es): {data.executors}</Info>
               <View style={{flexDirection: 'row'}}>
                    <Info>Instituições: {data.institutionName}</Info>
                        <OpenModalContact 
                            onPress={() => setModalContactVisible(true)}>
                                (Orientações para contato)
                        </OpenModalContact >
                        
                    <View>
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={modalContactVisible}
                            onRequestClose={() => setModalContactVisible(false)}
                            statusBarTranslucent={true}
                        >                           
                            <ContactInfo
                                close={() => setModalContactVisible(false)}
                            />
                        </Modal>
                        
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={modalRiskVisible}
                            onRequestClose={() => setModalRiskVisible(false)}
                            statusBarTranslucent={true}                       
                        >                                                                  
                            <RiskLevelModal close={() => setModalRiskVisible(false)}/>  
                        </Modal> 
                                      
                    </View>                                                            
               </View>
               <Info>Plano: {data.planType}</Info>
               <Info>Observações Gerais: {data.generalObservations}</Info> 

               <ButtonTask
                    title={data.started ? 'Finalizar Atividade' : 'Iniciar Atividade'}
               />

            </Header>
        </Container>
    )
}