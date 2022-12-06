import React, {useState } from "react";
import { Text, View } from "react-native";
import { Container, TaskView, VerticalLine, StyleInputView, CheckboxView } from "./styles";
import { Checkbox, Switch } from 'react-native-paper';
import { InputFinishTask } from "../InputFinishTask";
import { TasksList } from "../HighlightTasks/Index";
import { Dropdown } from "react-native-element-dropdown";

interface TasksProps {
  nome: string;
  descricao_atividade: string;
  protocolos: [string];
}

interface Props{
  task: TasksProps
}

const dropdown = [
  { label: 'Sim', value: '1' },
  { label: 'Não', value: '2' },
]

export function FinishAllTaskContainer({task}: Props){
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState('');
    
    const vitalSignsProtocol = () => {
        return(
          <>
          <StyleInputView>
            <View>
              <Text style={{fontSize: 10}}>Temperatura Corporal (°C)</Text>
              <InputFinishTask color='#61ACFF' keyboard="numeric"/>
            </View>
    
            <View>
              <Text style={{fontSize: 10}}>Pressão Sistólica (mmHg)</Text>
              <InputFinishTask color='#61ACFF' keyboard="numeric"/>
            </View>
          </StyleInputView>
    
          <StyleInputView>
            <View>
              <Text style={{fontSize: 10}}>Pressão Diastólica {'\n'}(mmHg)</Text>
              <InputFinishTask color='#61ACFF' keyboard="numeric"/>
            </View>
    
            <View>
              <Text style={{fontSize: 10}}>Saturação de Oxigênio {'\n'}SpO2(%)</Text>
              <InputFinishTask color='#61ACFF' keyboard="numeric"/>
            </View>
          </StyleInputView>
    
          <View style={{marginLeft: 40}}>
            <Text style={{fontSize: 10}}>Batimentos Cardiacos {'\n'}(BPM)</Text>
            <InputFinishTask color='#61ACFF' keyboard="numeric"/>
          </View>
        </>
      )
    }

    const eliminationsProtocol = () => {
      return (
        <>
          <StyleInputView>
          <View>
            <Text style={{fontSize: 10}}>Presença</Text>
            <Dropdown
                  style={{height: 28,
                  width: 150,
                  borderWidth: 0.9,
                  borderRadius: 8,
                  paddingHorizontal: 8,}}
                  labelField="label"
                  valueField="value"
                  value={value}
                  onChange={item => {
                    setValue(item.value);
                  }} 
                  data={dropdown}
                />
          </View>
  
          <View>
            <Text style={{fontSize: 10}}>Cor</Text>
            <InputFinishTask color='#61ACFF' keyboard='default'/>
          </View>
        </StyleInputView>
  
        <StyleInputView>
          <View>
            <Text style={{fontSize: 10}}>Odor</Text>
            <InputFinishTask color='#61ACFF' keyboard='default'/>
          </View>
  
          <View>
            <Text style={{fontSize: 10}}>Aspecto</Text>
            <InputFinishTask color='#61ACFF' keyboard='default'/>
          </View>
        </StyleInputView>
  
          <View style={{marginLeft: 38}}>
            <Text style={{fontSize: 10}}>{task.protocolos.includes("Protocolo de diurese") ? "Quantidade" : "Consistência"}</Text>
            <InputFinishTask color='#61ACFF' keyboard='default'/>
          </View>
        </>
      )
    }
    
    return(
        <Container>
            <TaskView>
            <CheckboxView> 
                <Text>{task.nome} - {task.descricao_atividade}</Text>               
                {task.descricao_atividade !== "Iniciar Plano de Cuidados" && task.descricao_atividade !== "Finalizar Plano de Cuidados"?                                        
                    <Checkbox
                      status={checked ? 'unchecked' : 'checked'}
                      onPress={() => {
                        setChecked(!checked);
                      }}
                      color='#5abec8'                  
                    />          
                : null}
            </CheckboxView>
          
                  {checked && !task.protocolos && (
                    <View>
                      <Text style={{fontSize: 12}}>Motivo da não ingestão</Text> 
                      <InputFinishTask color='#61ACFF' keyboard="default" />
                    </View>
                  )}
                
                  {task.protocolos && task.protocolos.includes("Protocolo de sinais vitais") && (
                    vitalSignsProtocol()
                  )}                               
          </TaskView>
      </Container>
  )
}