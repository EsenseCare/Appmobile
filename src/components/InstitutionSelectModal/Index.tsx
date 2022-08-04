import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native"
import { 
    GoBack, 
    HeaderPrincipal,     
    Input, 
    TitleSelectInstitution,
    Card
 } from "./styles"

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React, { useState } from "react"

interface SelectProps { 
    institutionsName: [];
}


export function InstitutionSelectModal({institutionsName}: SelectProps){
    const [visible, setVisible] = useState(false);
    
    return(
        <Input onPress={() => setVisible(true)}>
            <FontAwesome 
                name="search-plus" size={30} 
                style={{marginRight: 8, color: '#838f9a', marginLeft: 10}} 
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
                    <HeaderPrincipal>                     
                        <TouchableOpacity onPress={() => setVisible(false)}>
                                <GoBack>
                                    <Ionicons 
                                        name="arrow-back"
                                        size={40}                                                                                                                 
                                    />                                
                                </GoBack>
                                <Text>Voltar</Text>
                        </TouchableOpacity>                  
                            <TitleSelectInstitution>
                                Selecione a Instituição
                            </TitleSelectInstitution>                     
                    </HeaderPrincipal>
                </View>

                <FlatList 
                    data={institutionsName}
                    renderItem={({ item, index }) => (
                        <Card key={index}>     
                            <TouchableOpacity 
                            hitSlop={{top: 30, bottom: 20, left: 95, right: 95}}>                  
                                <Text style={{fontWeight: 'bold', color: 'white'}}>{item}</Text>
                            </TouchableOpacity>
                        </Card> 
                    )} 
                />
            </Modal>
        </Input>
    )
}