import { TouchableOpacityProps, Text } from 'react-native'

import { ButtonLogin } from './styles'

interface ButtonProps extends TouchableOpacityProps{
    title: string
}

export function ButtonLog({title }: ButtonProps){
    return(
        <ButtonLogin
                activeOpacity={0.7}                    
            >
            <Text style={{fontWeight: 'bold', color:'#ffff', fontSize: 18}}>
                {title}
            </Text>
        </ButtonLogin>
    )
}

