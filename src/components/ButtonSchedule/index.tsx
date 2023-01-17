import React, { useState } from 'react'
import { Text } from 'react-native'

import { Button } from './styles'

 export interface ButtonScheduleProps {
    time: string;
    onPressFunction: (value: string) => void;
    widthColor: string
    disabled?: boolean;
}       

export function ButtonSchedule({ time, widthColor, disabled, onPressFunction }: ButtonScheduleProps){

    return(
        <Button onPress={() => onPressFunction(time)} 
            style={{borderWidth: widthColor ? 2 : 0, borderColor: widthColor, opacity: disabled? 0.5  : 1}}
            disabled={disabled}
        >
            <Text>
                {time}
            </Text>
        </Button>
    )
}