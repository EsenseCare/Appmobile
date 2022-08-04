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

export const HeaderPrincipal = styled.View`
    background-color: ${({theme}) => theme.colors.blue_buttons};
    padding: ${RFValue(12)}px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
`;


export const TitleSelectInstitution = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    margin-top: ${RFValue(20)}px;
    font-size: ${RFValue(22)}px;
    align-self: center;
    color: white ;
`;

export const GoBack = styled.Text`
    color: white;
`;

export const Card = styled.View`
    border-radius: 16px;
    padding: 16px;
    margin-top: 24px;
    width: ${RFPercentage(40)}px;
    align-items: center;
    align-self: center;
    background-color: ${({theme}) => theme.colors.blue_buttons};
`;