import React, { useState } from 'react';
import { View, Modal, ModalProps, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';

import { Data, styles } from './styles';
import { Button } from '../ButtonTask/styles';

interface RegisterTaskProps extends ModalProps{
  onClose: () => void;
}

export function RegisterTask({onClose, ...rest}: RegisterTaskProps) {
  const [checked, setChecked] = useState(false);

  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      {...rest}
    >
      <View style={styles.container}>
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
            </View>
            <Button style={styles.stylesButton}>
              <Text style={styles.textButton}>Confirmar Execução da Atividade</Text>
            </Button>
            <Text>OU</Text>
            <Button style={styles.buttonCancel} onPress={onClose}>
              <Text>Cancelar</Text>
            </Button>
          </View>
        </View>

    </Modal>
  );
}