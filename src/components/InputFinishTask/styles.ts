import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'


export const InputText = styled.TextInput`
    flex: 1;
    font-size: ${RFValue(12)}px;
    align-content: center;
`;

export const Container = styled.View`
    margin-bottom: 10px;
    width: 148px;
    height: 27px;
    border-color: black;
    border-width: 2px;
    border-radius: 5px;
`;