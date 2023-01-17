import React, {useState } from "react";
import { KeyboardAvoidingView, Switch, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Checkbox } from "react-native-paper";
import { Container } from "../HighlightTasks/styles";
import { InputFinishTask } from "../InputFinishTask";
import { styles } from "./styles";

interface Props{
  protocols: [string];
  finishTaskStyles: any;
}

const dropdown = [
  { label: 'Sim', value: '1' },
  { label: 'Não', value: '2' },
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
  
  
export function InputFinishContainer({protocols, finishTaskStyles}: Props){
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(null);

  const [temperature, setTemperature] = useState('');
  const [pressionSis, setPressionSis] = useState('');
  const [pressionDias, setPressionDias] = useState('');
  const [saturation, setSaturation] = useState('');
  const [bpm, setBpm] = useState('');

  const [presence, setPresence] = useState(false);
  const [color, setColor] = useState('');
  const [smell, setSmell] = useState('');
  const [apearence, setApearence] = useState('');
  const [quantity, setQuantity] = useState('');

  const vitalSignsProtocol = () => {
    return(
      <Container style={styles.main}>
      <View style={styles.inputView}>
        <View>
          <Text style={{fontSize: 10}}>Temperatura Corporal (°C)</Text>
          <InputFinishTask color="#B9DAFF" keyboard="numeric" value={temperature} onChangeFunction={value => setTemperature(value)}/>
        </View>

        <View>
          <Text style={{fontSize: 10}}>Pressão Sistólica (mmHg)</Text>
          <InputFinishTask color="#B9DAFF" keyboard="numeric" value={pressionSis} onChangeFunction={value => setPressionSis(value)}/>
        </View>
      </View>

      <View style={styles.inputView}>
        <View>
          <Text style={{fontSize: 10}}>Pressão Diastólica {'\n'}(mmHg)</Text>
          <InputFinishTask color="#B9DAFF" keyboard="numeric" value={pressionDias} onChangeFunction={value => setPressionDias(value)}/>
        </View>

        <View>
          <Text style={{fontSize: 10}}>Saturação de Oxigênio {'\n'}SpO2(%)</Text>
          <InputFinishTask color="#B9DAFF" keyboard="numeric" value={saturation} onChangeFunction={value => setSaturation(value)}/>
        </View>
      </View>

        <View style={{marginLeft: finishTaskStyles}}>
          <Text style={{fontSize: 10}}>Batimentos Cardiacos (BPM)</Text>
          <InputFinishTask color="#B9DAFF" keyboard="numeric" value={bpm} onChangeFunction={value => setBpm(value)}/>
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
        <View style={{flexDirection: 'row',  alignItems: 'center'}}>
          <Text style={{fontSize: 13}}>Presença? </Text> 
          <Switch /> 
        </View>

        <View>
          <Text style={{fontSize: 10}}>Cor</Text>
          <InputFinishTask color="#B9DAFF" keyboard="numeric" value={color} onChangeFunction={value => setColor(value)}/>
        </View>
      </View>

      <View style={styles.inputView}>
        <View>
          <Text style={{fontSize: 10}}>Odor</Text>
          <InputFinishTask color="#B9DAFF" keyboard="numeric" value={smell} onChangeFunction={value => setSmell(value)}/>
        </View>

        <View>
          <Text style={{fontSize: 10}}>Aspecto</Text>
          <InputFinishTask color="#B9DAFF" keyboard="numeric" value={apearence} onChangeFunction={value => setApearence(value)}/>
        </View>
      </View>

        <View style={{marginLeft: finishTaskStyles}}>
          <Text style={{fontSize: 10}}>{protocols.includes("Protocolo de diurese") ? "Quantidade" : "Consistência"}</Text>
          <InputFinishTask color="#B9DAFF" keyboard="default" value={quantity} onChangeFunction={value => setQuantity(value)}/>
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
                    <InputFinishTask color="#B9DAFF" keyboard="numeric" onChangeFunction={value => setTemperature(value)}/>
                  </View>
                <KeyboardAvoidingView behavior='padding'> 
                  <Dropdown
                  style={{height: 28,
                    width: 165,
                    borderWidth: 2,
                    paddingHorizontal: 8,
                    marginTop: 16.8,
                    borderRadius: 6}}
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