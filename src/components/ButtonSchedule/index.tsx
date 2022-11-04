import React from 'react'
import { Text } from 'react-native'

import { Button } from './styles'

 export interface ButtonScheduleProps {
    time: string;
    active?: boolean;
    onPressFunction: (value: string) => void;
}

export function ButtonSchedule({ time, onPressFunction }: ButtonScheduleProps){
    return(
        <Button onPress={() => onPressFunction(time)}>
            <Text>
                {time}
            </Text>
        </Button>
    )
}