import styled from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

export const Input = styled.TouchableOpacity`
    height: ${RFPercentage(8)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
    margin-top: 20px;
    border-radius: 4px;
    border: none;
`;

export const HeaderOne = styled.View`
    background-color: #eee;
    padding: ${RFValue(10)}px;
`;

export const HeaderTwo = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
    margin-top: ${RFPercentage(2)}px;
`;

export const InputSelect = styled.TextInput`
    background-color: #fff;
    border-radius: 6px;
    height: ${RFValue(40)}px;
    margin-top: 5px;
`;

export const TitleSelectInstitution = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    margin-top: ${RFValue(20)}px;
    font-size: ${RFValue(14)}px;
    padding-left: 16px;
`;

export const Conclude = styled.Text`
    font-size: ${RFValue(14)}px;
    color: blue;
`;