import { useState } from 'react'
import { TouchableOpacityProps, Text } from 'react-native'

import { Button } from './styles'

interface ButtonProps extends TouchableOpacityProps{
    title: string
}

export function ButtonTask({title}: ButtonProps){

    return(
        <Button
                activeOpacity={0.7}
            
            >
            <Text style={{color:'#ffff', fontSize: 15}}>
                {title}
            </Text>
        </Button>
    )
}