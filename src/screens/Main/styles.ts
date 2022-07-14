import styled from "styled-components/native";
import { RFPercentage } from 'react-native-responsive-fontsize'

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`;
export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(20)}px;   
    background-color: ${({theme}) => theme.colors.blue_buttons};
   
    justify-content: center;
    border-radius: 10px;
`;

export const FinishAllTasks = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.blue_buttons};
    height: ${RFPercentage(6)}px;
    width: ${RFPercentage(29)}px;
    border-radius: 5px;
    align-Items: center;
    justify-content: center; 
    margin-top: 20px;
    margin-right: 12px;  
`;