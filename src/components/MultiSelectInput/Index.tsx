import { Modal, Text, TouchableOpacity, View } from "react-native"
import { Input } from "./styles"

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import React, { useState } from "react"

export function MultiSelectInput(){
    const [visible, setVisible] = useState(false);

    return(
        <Input onPress={() => setVisible(true)}>
            <FontAwesome 
                name="search-plus" size={30} 
                style={{marginRight: 8, color: 'blue', marginLeft: 10}} 
            />
            <Text style={{color: '#76838f'}}>
                Selecionar {'\n'}
                Instituição
            </Text>
            <Modal
                onRequestClose={() => setVisible(false)}
                visible={visible}
                animationType="slide"
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity 
                        onPress={() => setVisible(false)}
                    >
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </Input>
    )
}