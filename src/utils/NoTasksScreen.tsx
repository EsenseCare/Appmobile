import React from "react";
import { View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'

interface ScreenProps {
    serverError: any;
}

export function NoTasksScreen({serverError} : ScreenProps){
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 80 }}>
            {!serverError ? 
            <> 
                <Text style={{fontSize: 24, color: 'gray',}}>
                    Sem atividades para este dia
                </Text>

                <Text style={{fontSize: 18, color: "gray"}}>
                    Selecione uma nova data no calendário.
                </Text> 
            </> 
            : 
            <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                <AntDesign 
                    name="exclamationcircleo" 
                    size={46}
                    style={{marginRight: 16}}
                    color={"red"}
                />
                <Text style={{fontSize: 24, color: 'gray',}}>
                    Ocorreu um erro ao{'\n'}retornar as atividades
                </Text>
            </View> }
        </View>
    )
}