import React from "react";
import { View, Text} from 'react-native';

export function NoTasksScreen(){
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 80 }}>
            <Text style={{
                fontSize: 22,
                color: 'gray',
            }}>
                Sem atividades para essa data.</Text>
        </View>
    )
}