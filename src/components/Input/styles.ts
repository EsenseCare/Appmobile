import styled from 'styled-components/native'
import { TextInput } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Props } from '.';

export const InputText = styled(TextInput)<Props>`
    flex: 1;
    padding: 8px 0 0 10px;
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular}; 
    border-radius: 5px;
    align-content: center;
`;

export const Container = styled.View`
    margin-bottom: 10px;
    width: 77%;
    height: 58px;
    border-color: #ccc;
    border-Radius: 12px;
    border-width: 2px;
    flex-direction: row;
    align-items: center;
    background-color: #fff;
`;


export const Error = styled.Text`
    font-size: ${RFValue(12)}px;
    color: red;
    font-family: ${({ theme }) => theme.fonts.regular};
 
`;