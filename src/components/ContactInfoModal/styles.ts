import styled from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.TouchableOpacity`
    flex: 1;   
    align-self: center;
    justify-content: center;
`;

export const ModalContent = styled.View`
    height: ${RFPercentage(32)}px;
    width: ${RFPercentage(52)}px;
    padding-top: 10px;
    border-radius: 10px;
    background-color: white;
    border-width: 2px;
    border-color: ${({theme}) => theme.colors.default_color};
`;

export const VerticalLine = styled.View`   
    height: 100%;
    width: 0.3%;
    background-color: #909090;
    margin-left: ${RFPercentage(8)}px;
`;

export const InfoView = styled.View`
    color: ${({theme}) => theme.colors.default_color};
    border-right-color: transparent;
    border-left-color: transparent;  
    border-width: 0.3px; 
    flex-direction: row;
    justify-content: space-between;
    height: ${RFValue(36)}px;
    align-items: center;  
    margin-top: 6px;  
`;

export const Informations = styled.Text`
    font-size: ${RFValue(14)}px;
    margin-left: 6px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    margin-left: 6px;
    color: ${({theme}) => theme.colors.blue_buttons};
`;

