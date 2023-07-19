import React, {useState} from "react";
import { Text, View } from "react-native";
import { Container, TaskView, CheckboxView } from "./styles";
import { Checkbox } from 'react-native-paper';
import { InputFinishTask } from "../InputFinishTask";
import { InputFinishContainer } from "../InputFinishComponent";

interface TasksProps {
  nome: string;
  descricao_atividade: string;
  protocolos: [string];
}

interface Props{
  task: TasksProps
  finishTaskStyle: any;
  sendInfo: (data: any) => void;
}

export function FinishAllTaskContainer({task, sendInfo}: Props){
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState('');
    const [infoData, setInfoData] = useState({
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
      noIngestion: value
    });

    sendInfo(infoData);
    
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
                    <InputFinishTask color='#B9DAFF' keyboard="default" onChangeFunction={(value) => setValue(value)} />
                  </View>
                )}            
                {task.protocolos && task.protocolos.includes("Protocolo de sinais vitais") && (
                  <InputFinishContainer protocols={task.protocolos} finishTaskStyles={21} info={infoData} onChangeInfo={setInfoData}/>
                )}
          </TaskView>
      </Container>
  )
}


