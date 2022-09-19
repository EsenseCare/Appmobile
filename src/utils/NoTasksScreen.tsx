import React from "react";
import { View, Text} from 'react-native';

export function NoTasksScreen(){
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 80 }}>
            <Text style={{fontSize: 24, color: 'gray',}}>
                Sem atividades para esse dia
            </Text>

            <Text style={{fontSize: 16, color: "gray"}}>
                Altere a data em "Filtrar Data"
            </Text>
        </View>
    )
}