import React, { useEffect, useState } from 'react';
import { View, Modal, ModalProps, Text, ScrollView, KeyboardAvoidingView } from 'react-native';

import { Data, styles } from './styles';
import { Button } from '../ButtonTask/styles';
import { InputFinishContainer } from '../InputFinishComponent';
import api from '../../services/api';
import { Dropdown } from 'react-native-element-dropdown';
import { Checkbox } from 'react-native-paper';
import { InputFinishTask } from '../InputFinishTask';

interface RegisterTaskProps extends ModalProps{
  onClose: () => void;
  protocolos: [string];
  infoId: any;
  onChangeInfo: (info: any) => void;
}

const dropdown = [
  { labelYN: 'Sim', valueYN: '1' },
  { labelYN: 'Não', valueYN: '2' },
]

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

export function RegisterTask({onClose, protocolos, infoId, onChangeInfo, ...rest}: RegisterTaskProps) {
  

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
    consistence: null,
  });

  const [isFinished, setIsFinished] = useState(false);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(null);
  const [valueDropdown, setValueDropdown] = useState<any>(dropdown);
  

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const hour = new Date().getHours();
  const minutes = new Date().getMinutes();
  const minuteFormatted = new Date().getMinutes() <10? '0' + minutes : minutes;

  const noProtocol = {
    "plano_atividade": {
      "data_horario_execucao(3i)": currentDay,
      "data_horario_execucao(2i)": currentMonth,
      "data_horario_execucao(1i)": currentYear,
      "data_horario_execucao(4i)": hour,
      "data_horario_execucao(5i)": minuteFormatted,
      "usuario_execucao_id": "29",
      "medicacao_adicional": "0",
      "medicamento_esporadico_id": "",
      "conteudo_total_medicacao_adicional": "",
    }
  }

  const diurese = {
    "eliminacoes_presenca": info.presence,
    "eliminacoes_cor": info.color,
    "eliminacoes_odor": info.smell,
    "eliminacoes_aspecto": info.apearence,
    "eliminacoes_consistencia": info.consistence,
    "diurese_presenca": info.presence,
    "diurese_cor": "ok",
    "diurese_odor": "ok",
    "diurese_quantidade": "ok",
    "diurese_aspecto": "ok",
    "ulcera_presenca": "false",
    "ulcera_aspecto": "ok",
    "ulcera_estagio": "ok"
  }

  const sinais = {
    "plano_atividade": {
      "data_horario_execucao(3i)": currentDay,
      "data_horario_execucao(2i)": currentMonth,
      "data_horario_execucao(1i)": currentYear,
      "data_horario_execucao(4i)": hour,
      "data_horario_execucao(5i)": minuteFormatted,
      "usuario_execucao_id": "29",
      "medicacao_adicional": checked,
      "medicamento_esporadico_id": "",
      "conteudo_total_medicacao_adicional": value,
      "plano_atividade_sinais_attributes": [
        {
          "valor": info.temperature,
        },
        {
          "valor": info.pressionSis,
        },
        {
          "valor": info.pressionDias,
        },
        {
          "valor": info.saturation,
        },
        {
          "valor": info.bpm,
        }
      ],

    "eliminacoes_presenca": "false",
    "eliminacoes_cor": "ok",
    "eliminacoes_odor": "ok",
    "eliminacoes_aspecto": "ok",
    "eliminacoes_consistencia": "ok",
    "diurese_presenca": "true",
    "diurese_cor": "ok",
    "diurese_odor": "ok",
    "diurese_quantidade": "ok",
    "diurese_aspecto": "ok",
    "ulcera_presenca": "false",
    "ulcera_aspecto": "ok",
    "ulcera_estagio": "ok"
    }
  }

  const sinaisDiurese = {
    "plano_atividade": {
      "data_horario_execucao(3i)": currentDay,
      "data_horario_execucao(2i)": currentMonth,
      "data_horario_execucao(1i)": currentYear,
      "data_horario_execucao(4i)": hour,
      "data_horario_execucao(5i)": minuteFormatted,
      "usuario_execucao_id": "31",
      "medicacao_adicional": "0",
      "medicamento_esporadico_id": "",
      "conteudo_total_medicacao_adicional": "",
      "plano_atividade_sinais_attributes": [
        {
          "valor": info.temperature,
        },
        {
          "valor": info.pressionSis,
        },
        {
          "valor": info.pressionDias,
        },
        {
          "valor": info.saturation,
        },
        {
          "valor": info.bpm,
        }
      ],
    }
  }

  function changeValues(value: any){
    onChangeInfo({...info, ...value})
  }

  async function finishTask(){

 
   try {
    const { data } = await api
    .post(
    `/cuidador/finalizar-atividade?plano_atividade_id=${infoId}`, 
      protocolos && protocolos.includes("Protocolo de sinais vitais") ? sinais: 
      noProtocol || 
      protocolos && protocolos.includes("Protocolo de diurese") ? diurese : 
      noProtocol ||
      protocolos && protocolos.includes("Protocolo de dsinais vitais") && protocolos.includes("Protocolo de diurese") ? sinaisDiurese :
      noProtocol
    );
    setInfo(data);

   } catch (err: any) {
    if (err) {
      console.log(err.response?.data.message);
    }
   }
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
              <Text style={{fontSize: 12, color: '#747474'}}>
                Executado em {} {'\n'}Por: Cuidador1
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
                    <InputFinishTask color="#B9DAFF" keyboard="numeric" onChangeFunction={value => changeValues({qty: value})}/>
                  </View>
                <KeyboardAvoidingView behavior='padding'> 
                  <Dropdown
                  style={{height: 28,
                    width: 165,
                    borderWidth: 2,
                    paddingHorizontal: 8,
                    marginTop: 16.8,
                    borderRadius: 6, backgroundColor: '#B9DAFF'}}
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
