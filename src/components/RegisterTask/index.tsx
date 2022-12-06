import React, { useState } from 'react';
import { View, Modal, ModalProps, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Checkbox, Switch } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';

import { Data, styles } from './styles';
import { Button } from '../ButtonTask/styles';
import { InputFinishTask } from '../InputFinishTask';


interface RegisterTaskProps extends ModalProps{
  onClose: () => void;
  protocolos: [string];
}

const data = [
  { label: 'Item aa', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];


export function RegisterTask({onClose, protocolos, ...rest}: RegisterTaskProps) {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(null);

  const vitalSignsProtocol = () => {
    return(
      <>
      <View style={styles.inputView}>
        <View>
          <Text style={{fontSize: 10}}>Temperatura Corporal (°C)</Text>
          <InputFinishTask color="" keyboard="numeric"/>
        </View>

        <View>
          <Text style={{fontSize: 10}}>Pressão Sistólica (mmHg)</Text>
          <InputFinishTask color="" keyboard="numeric"/>
        </View>
      </View>

      <View style={styles.inputView}>
        <View>
          <Text style={{fontSize: 10}}>Pressão Diastólica {'\n'}(mmHg)</Text>
          <InputFinishTask color="" keyboard="numeric"/>
        </View>

        <View>
          <Text style={{fontSize: 10}}>Saturação de Oxigênio {'\n'}SpO2(%)</Text>
          <InputFinishTask color="" keyboard="numeric"/>
        </View>
      </View>

        <View style={{marginLeft: 11}}>
          <Text style={{fontSize: 10}}>Batimentos Cardiacos (BPM)</Text>
          <InputFinishTask color="" keyboard="numeric"/>
        </View>
      </>
    )
  }

  const eliminationsProtocol = () => {
    return (
      <>
        <View style={styles.inputView}>
        <View>
          <Text style={{fontSize: 10}}>Presença</Text>
          <Switch />
        </View>

        <View>
          <Text style={{fontSize: 10}}>Cor</Text>
          <InputFinishTask color="" keyboard='default'/>
        </View>
      </View>

      <View style={styles.inputView}>
        <View>
          <Text style={{fontSize: 10}}>Odor</Text>
          <InputFinishTask color="" keyboard='default'/>
        </View>

        <View>
          <Text style={{fontSize: 10}}>Aspecto</Text>
          <InputFinishTask color="" keyboard='default'/>
        </View>
      </View>

        <View style={{marginLeft: 11}}>
          <Text style={{fontSize: 10}}>{protocolos.includes("Protocolo de diurese") ? "Quantidade" : "Consistência"}</Text>
          <InputFinishTask color="" keyboard='default'/>
        </View>
      </>
    )
  }

  const hygieneProtocol = () => {
    return(
      <View>
        
      </View>
    )
  }

  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      
      {...rest}
    >
      <View style={styles.container}>
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
              <Data>Observação teste</Data>
            </View>
            <View style={styles.footerInfo}>
              <Text 
              style={{
                fontSize: 12,
                color: '#747474'
              }}>
                Executado em 21/10/2022 13:16 {'\n'}Por: Cuidador1
              </Text>

              <View style={styles.checkBox}>                          
                  <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                    color='#5abec8'
                  
                  /> 
                <Text style={{fontSize: 12}}>   
                  Foi necessário dar medicação adicional?   
                </Text>
              </View>

              {checked ? <View style={styles.InputView}>                  
                  <View> 
                    <Text style={{fontSize: 11}}>Informe a quantidade: </Text>
                    <InputFinishTask color="" keyboard={'numeric'}/>
                  </View>
                <KeyboardAvoidingView behavior='padding'> 
                  <Dropdown
                  style={{height: 28,
                    width: 165,
                    borderWidth: 1,
                    paddingHorizontal: 8,
                    marginTop: 16.8}}
                    labelField="label"
                    valueField="value"
                    placeholder={'Selecionar item'}
                    value={value}
                    onChange={item => {
                      setValue(item.value);
                    }} 
                    data={data}
                  />
                </KeyboardAvoidingView> 
              </View> : null}

              {protocolos && protocolos.includes("Protocolo de sinais vitais") ? 
                <View style={{marginLeft: -12}}> 
                  {vitalSignsProtocol()}
                </View>
              : null}

              {protocolos && protocolos.includes("Protocolo de eliminações (evacuações)") ? 
                <View style={{marginLeft: -12}}> 
                  {eliminationsProtocol()}
                </View>
              : null}
                   
            </View>
            <Button style={styles.stylesButton}>
              <Text style={styles.textButton}>Confirmar Execução da Atividade</Text>
            </Button>
            <Text>OU</Text>
            <Button style={styles.buttonCancel} onPress={onClose}>
              <Text>Cancelar</Text>
            </Button>
            
          </View>
          </ScrollView>          
        </View>          
    </Modal>
  );
}
