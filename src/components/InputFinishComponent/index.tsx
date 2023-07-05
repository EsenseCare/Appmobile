import React, {useState, memo} from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Checkbox } from "react-native-paper";
import { Container } from "../HighlightTasks/styles";
import { InputFinishTask } from "../InputFinishTask";
import { styles } from "./styles";

interface Props{
  protocols: [string];
  finishTaskStyles: number;
  info: any;
  values?: () => void;
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
  
  
export function InputFinishContainer({protocols, info, onChangeInfo, finishTaskStyles}: Props){

  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(null);
  const [valueDropdown, setValueDropdown] = useState<any>(dropdown);

  function changeValues(value: any){
    onChangeInfo({...info, ...value})
  }

  const handleArray = () => {
    setValueDropdown(dropdown.filter((obj:any) => obj.labelYN))
  }

  const vitalSignsProtocol = () => {
    return(
      <Container style={styles.main}>
      <View style={styles.inputView}>
        <View>
          <Text style={{fontSize: 10}}>Temperatura Corporal (°C)</Text>
          <InputFinishTask color="#B9DAFF" keyboard="numeric" onChangeFunction={value => changeValues({temperature: value})}/>
        </View>

        <View>
          <Text style={{fontSize: 10}}>Pressão Sistólica (mmHg)</Text>
          <InputFinishTask color="#B9DAFF" keyboard="numeric"  onChangeFunction={value => changeValues({pressionSis: value})}/>
        </View>
      </View>

      <View style={styles.inputView}>
        <View>
          <Text style={{fontSize: 10}}>Pressão Diastólica {'\n'}(mmHg)</Text>
          <InputFinishTask color="#B9DAFF" keyboard="numeric" onChangeFunction={value => changeValues({pressionDias: value})}/>
        </View>

        <View>
          <Text style={{fontSize: 10}}>Saturação de Oxigênio {'\n'}SpO2(%)</Text>
          <InputFinishTask color="#B9DAFF" keyboard="numeric" onChangeFunction={value => changeValues({saturation: value})}/>
        </View>
      </View>

        <View style={{marginLeft: finishTaskStyles}}>
          <Text style={{fontSize: 10}}>Batimentos Cardiacos (BPM)</Text>
          <InputFinishTask color="#B9DAFF" keyboard="numeric" onChangeFunction={value => changeValues({bpm: value})}/>
        </View>
      </Container>
    )
    
  }

  const eliminationsProtocol = () => {
    return (
      <>
      <Text>
      {'\n'}
      </Text>
        <View style={styles.inputView}>
        <View>
        <Text style={{fontSize: 12}}>Presença? </Text> 
          <Dropdown
            style={{height: 26, width: 153, borderWidth: 2, paddingHorizontal: 10, margin: -2, borderRadius: 6, backgroundColor: '#B9DAFF'}}
            labelField="labelYN"
            valueField="valueYN"
            value={valueDropdown}
            placeholder={"Selecione"}
            onChange={(value) => changeValues({presence: value.labelYN})}
            data={dropdown}
          />
        </View>

        <View>
          <Text style={{fontSize: 10}}>Cor</Text>
          <InputFinishTask color="#B9DAFF" keyboard="default" onChangeFunction={value => changeValues({color: value})}/>
        </View>
      </View>

      <View style={styles.inputView}>
        <View>
          <Text style={{fontSize: 10}}>Odor</Text>
          <InputFinishTask color="#B9DAFF" keyboard="default" onChangeFunction={value => changeValues({smell: value})}/>
        </View>

        <View>
          <Text style={{fontSize: 10}}>Aspecto</Text>
          <InputFinishTask color="#B9DAFF" keyboard="default" onChangeFunction={value => changeValues({apearence: value})}/>
        </View>
      </View>

        <View style={{marginLeft: finishTaskStyles}}>
          <Text style={{fontSize: 10}}>{protocols.includes("Protocolo de diurese") ? "Quantidade" : "Consistência"}</Text>
          <InputFinishTask color="#B9DAFF" keyboard="default" onChangeFunction={value => changeValues({qty: value})}/>
        </View>
      </>
    )
  }

    return(
        <>
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

            {protocols.includes("Protocolo de sinais vitais") ? vitalSignsProtocol() : null}
            {protocols.includes("Protocolo de eliminações (evacuações)") ? eliminationsProtocol() : null}
        </>
    )
}

export default memo(InputFinishContainer);