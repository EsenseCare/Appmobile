import React, { useState } from 'react'
import { TouchableOpacityProps, Text } from 'react-native'
import { RegisterTask } from '../RegisterTask';

import { Button } from './styles'

interface ButtonProps extends TouchableOpacityProps{
    title: string
    protocolos:[string]
    onPressFunction: () => void;
    id: number;
}

export function ButtonTask({title, protocolos, id, onPressFunction}: ButtonProps){
    const [modalStartTask, setModalStartTask] = useState<boolean>(false);
    
    return(
        <>
            <Button
                activeOpacity={0.7}
                onPress={() => {
                    onPressFunction();
                    title === 'Finalizar Atividade'? setModalStartTask(true) : setModalStartTask(false);
                }}
            >
                <Text style={{color:'#ffff', fontSize: 15}}>
                    {title}
                </Text>
            </Button>
            
            <RegisterTask 
                visible={modalStartTask}
                onClose={() => setModalStartTask(false)}
                onRequestClose={() => setModalStartTask(false)}
                protocolos={protocolos}
                infoId={id}           
            />
        </>
    )
}