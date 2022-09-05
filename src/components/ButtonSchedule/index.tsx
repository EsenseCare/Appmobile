import React from 'react'
import { Text } from 'react-native'

import { Button } from './styles'

 export interface ButtonScheduleProps {
    time: string;
    active?: boolean
}

export function ButtonSchedule({ time }: ButtonScheduleProps){
    return(
        <Button onPress={() => console.log(time)}>
            <Text>
                {time}
            </Text>
        </Button>
    )
}