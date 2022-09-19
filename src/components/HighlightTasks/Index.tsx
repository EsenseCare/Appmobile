import { Container, PatientName, Header, TaskName, Info, TimeTask, OpenModalContact, OpenModalRiskButton  } from './styles'

import { Modal, View} from 'react-native'
import { ButtonTask } from '../ButtonTask/Index'
import { ContactInfo } from '../ContactInfoModal'
import React, { useState } from 'react'
import { RiskLevelModal } from '../RiskLevelModal'

interface HighlightTasksProps {
    data: {
        nome: string;
        observacao_atividade: string;
        executores: [{
            nome: string;
            perfil: string;
        }]
        instituicao_saude: string;
        descricao_atividade: string;
        plano: {
            id: number;
            created_at: Date;
            data_execucao: string;
        }
        started: boolean;
        risco: boolean;
        levelRiskMorse: string;
        levelRiskBarden: string;
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
                        {data.plano.data_execucao.split('-').reverse().join('/')}
                    </TimeTask>
                </View>              
                <View style={{flexDirection: 'row'}}>
                    <PatientName>{data.nome}</PatientName>
                    <TaskName>{data.descricao_atividade}</TaskName>
                    {data.risco ?
                    <OpenModalRiskButton
                        onPress={() => setModalRiskVisible(true)}>
                        Paciente de risco
                    </OpenModalRiskButton> 
                    : null }                   
                </View>

               <Info>Executor(es): {data.executores.map((nome => " | " + nome.nome))}</Info>
               <View style={{flexDirection: 'row'}}>
                    <Info>Instituições: {data.instituicao_saude}</Info>
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
                            <RiskLevelModal 
                                close={() => setModalRiskVisible(false)}
                                item={data}
                            />  
                        </Modal> 
                                      
                    </View>                                                            
               </View>
               <Info>Plano: {data.plano.id}</Info>
               <Info>Observações Gerais: {data.observacao_atividade}</Info> 

               <ButtonTask
                    title={data.started ? 'Finalizar Atividade' : 'Iniciar Atividade'}
               />
            </Header>
        </Container>
    )
}