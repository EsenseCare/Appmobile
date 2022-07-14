import { TouchableOpacityProps, Text } from 'react-native'

import { ButtonLogin } from './styles'

interface ButtonProps extends TouchableOpacityProps{
    title: string
}

export function ButtonTask({title}: ButtonProps){
    return(
        <ButtonLogin
                activeOpacity={0.7}                    
            >
            <Text style={{color:'#ffff', fontSize: 14}}>
                {title}
            </Text>
        </ButtonLogin>
    )
}