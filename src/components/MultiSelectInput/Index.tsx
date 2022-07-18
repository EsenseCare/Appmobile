import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Conclude, HeaderOne, HeaderTwo, Input, InputSelect, TitleSelectInstitution } from "./styles"

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
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
                <View style={{flex: 1}}>
                    <HeaderOne>
                        <HeaderTwo>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Conclude>Voltar</Conclude>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <TitleSelectInstitution>
                                    Selecione a Instituição
                                </TitleSelectInstitution>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Conclude>Concluir</Conclude>
                            </TouchableOpacity>
                        </HeaderTwo>
                        <InputSelect 
                            placeholder="Pesquisar"
                        />
                    </HeaderOne>
                </View>
            </Modal>
        </Input>
    )
}