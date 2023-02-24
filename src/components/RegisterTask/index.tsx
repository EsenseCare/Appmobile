import React, { useEffect, useState } from 'react';
import { View, Modal, ModalProps, Text, ScrollView, KeyboardAvoidingView } from 'react-native';

import { Data, styles } from './styles';
import { Button } from '../ButtonTask/styles';
import { InputFinishContainer } from '../InputFinishComponent';


interface RegisterTaskProps extends ModalProps{
  onClose: () => void;
  protocolos: [string];
}

export function RegisterTask({onClose, protocolos, ...rest}: RegisterTaskProps) {

  const [info, setInfo] = useState({
    qty: null,
    temperature: null,
    pressionSis: null,
    pressionDias: null,
    saturation: null,
    bpm: null,
    presence: false,
    color: null,
    smell: null,
    apearence: null,
    quantity: null,
  })

  function finishTask(){
    console.log(info)
  }

  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      
      {...rest}
    >
      <View style={styles.container}>
      <KeyboardAvoidingView behavior='position'>
      <ScrollView>
        <View style={styles.content}>                
            <View>
              <Text style={styles.title}>Registrar Atividade</Text>
            </View>

            <View style={styles.table}>
              <Data>Paciente:</Data>
              <Data>Nome do Paciente</Data>
            </View>
            <View style={styles.table}>
              <Data>Atividade:</Data>
              <Data>Almoço</Data>
            </View>
            <View style={styles.table}>
              <Data>Protocolos:</Data>
              <Data>Nenhum</Data>
            </View>
            <View style={styles.table}>
              <Data>Aparelho:</Data>
              <Data></Data>
            </View>
            <View style={styles.table}>
              <Data>Insumos:</Data>
              <Data></Data>
            </View>
            <View style={styles.table}>
              <Data>Arquivo:</Data>
              <Data></Data>
            </View>
            <View style={styles.table}>
              <Data>Data/Hora:</Data>
              <Data>30/08/2022 </Data>
            </View>
            <View style={styles.table}>
              <Data>Observação:</Data>
              <Data>Observação qualquer</Data>
            </View>
            <View style={styles.footerInfo}>
              <Text 
              style={{
                fontSize: 12,
                color: '#747474'
              }}>
                Executado em 21/10/2022 13:16 {'\n'}Por: Cuidador1
              </Text>
          

              {protocolos && protocolos.includes("Protocolo de sinais vitais") ? 
                <View style={{marginLeft: -10}}> 
                  <InputFinishContainer protocols={protocolos} finishTaskStyles={5} info={info} onChangeInfo={setInfo} values={() => finishTask()}/>
                </View>
              : null}
                   
            </View>
            <Button style={styles.stylesButton} onPress={finishTask}>
              <Text style={styles.textButton}>Confirmar Execução da Atividade</Text>
            </Button>
            <Text>OU</Text>
            <Button style={styles.buttonCancel} onPress={onClose}>
              <Text>Cancelar</Text>
            </Button>
            
          </View>
        
          </ScrollView>
          </KeyboardAvoidingView>          
        </View>          
    </Modal>
  );
}
