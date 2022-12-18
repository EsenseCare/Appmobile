import styled from "styled-components/native";
import { RFPercentage } from 'react-native-responsive-fontsize'

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`;
export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(19)}px;   
    background-color: ${({theme}) => theme.colors.blue_buttons};  
    justify-content: center;
    border-radius: 10px;
    padding-top: 8px;  
`;

export const FinishAllTasks = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.blue_buttons};
    height: ${RFPercentage(7)}px;
    width: ${RFPercentage(34.5)}px;
    border-radius: 5px;
    align-Items: center;
    justify-content: center; 
    margin-top: 20px;
    margin-right: 12px; 
`;

export const HeaderText = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: #ffffff;
    font-size: 22px;
    padding: 10px 0 1px;
    margin-right: 2px;
`;

export const FilterInfo = styled.View`
    margin-top: 6px;
    margin-left: 8px;
`;

export const FilterInfoText = styled.Text`
    color: #787171;
    font-size: 16px;
`;

export const IconView = styled.View`
    flex-direction: row; 
    align-items: center;                 
    justify-content: space-around;
    padding-top: 40px;
    width: 156px;
`;
export const ClearFilters = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.blue_buttons};
    height: 40px;
    width: ${RFPercentage(15)}px;
    border-radius: 4px;
    align-Items: center;
    justify-content: center;
    margin-top: ${RFPercentage(-5)}px;
    align-self: flex-end;
`;

export const Warning = styled.View`
    position: absolute;    
    width: 70%;
    height: 6%;
    background: #E73838;
    align-self: center;
    border-color: black;
    border-radius: 8px;
    border: 1px;
    align-items: center;
    flex-direction: row;
    z-index: 1;
    top: ${RFPercentage(100)}px;
`;  