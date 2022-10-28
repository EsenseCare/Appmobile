import React, { useEffect, useState } from 'react'
import { TouchableOpacityProps, Text } from 'react-native'
import api from '../../services/api';
import { RegisterTask } from '../RegisterTask';

import { Button } from './styles'

interface ButtonProps extends TouchableOpacityProps{
    title: string
    onPressFunction: () => void;
}

export function ButtonTask({title,  onPressFunction}: ButtonProps){
    const [modalStartTask, setModalStartTask] = useState<boolean>(false);

    return(
        <>
            <Button
                activeOpacity={0.7}
                onPress={onPressFunction}
            >
                <Text style={{color:'#ffff', fontSize: 15}}>
                    {title}
                </Text>
            </Button>
            <RegisterTask 
                visible={modalStartTask}
                onClose={() => setModalStartTask(false)}                
            />
        </>
    )
}