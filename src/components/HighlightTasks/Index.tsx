import { Container, PatientName, Header, TaskName, Info, TimeTask, OpenModalContact, OpenModalRiskButton  } from './styles'

import { Modal, View, Text} from 'react-native'
import { ButtonTask } from '../ButtonTask/Index'
import { ContactInfo } from '../ContactInfoModal'
import React, { useEffect, useState } from 'react'
import { RiskLevelModal } from '../RiskLevelModal'
import api from '../../services/api'

interface HighlightTasksProps {
    info: {
        id: string
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
        data_horario_inicio: any;
        levelRiskMorse: string;
        levelRiskBarden: string;
    }
}

export function TasksList({info}: HighlightTasksProps){
    const [modalContactVisible, setModalContactVisible] = useState(false);
    const [modalRiskVisible, setModalRiskVisible] = useState(false);
    const [getTaskId, setGetTaskId] = useState<boolean>(false);
    

    function taskTime (date: Date) {
        let hour = date.getHours();
        let minute = date.getMinutes();
        let minuteFormatted = date.getMinutes() <10? '0' + minute : minute
        return hour + ":" + minuteFormatted
    }

    async function startTask () {
        if(info.data_horario_inicio !== false){
            console.log("Atividade já iniciada.");
            return;
        }

        const { data } = await api.post('/cuidador/iniciar-atividade', {"plano_atividade_id": info.id })
        console.log(data);
        console.log(info.id);
    }


    return(
        <Container>
            <Header>
                <View style={{flexDirection: 'row-reverse'}}>
                    <TimeTask>
                        {info.plano.data_execucao.split('-').reverse().join('/')} {''}  
                          ás {''} 
                        {taskTime(new Date(info.data_horario_inicio))}
                    </TimeTask>
                </View>              
                <View style={{flexDirection: 'row', flexWrap: 'wrap',  marginTop: 8}}>
                    <PatientName>{info.nome}</PatientName>
                    <TaskName>{info.descricao_atividade}</TaskName>
                    {info.risco ?
                    <OpenModalRiskButton
                        onPress={() => setModalRiskVisible(true)}>
                        Paciente de Risco
                    </OpenModalRiskButton> 
                    : null }                   
                </View>

               <Info>
                    <Text style={{color: 'black'}}>Executor(es): </Text> 
                    {info.executores.map((nome => nome.nome + " (" +nome.perfil+"),"))}
                </Info>
               <View style={{flexDirection: 'row'}}>
                        <Info>
                            <Text style={{color: 'black'}}>Instituições: </Text>
                            {info.instituicao_saude}
                        </Info>
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
                                item={info}
                            />  
                        </Modal>                                   
                    </View>                                                            
               </View>
               <Info>
                    <Text style={{color: 'black'}}>Plano: </Text>
                    {info.plano.id}
               </Info>
               <Info>
                    <Text style={{color: 'black'}}>Observações Gerais: </Text>
                    {info.observacao_atividade}
               </Info> 

               <ButtonTask
                    title={'Iniciar Atividade'}
                    onPressFunction={startTask}
                    />
            </Header>
        </Container>
    )
}