import styled from "styled-components/native";
import { RFPercentage } from 'react-native-responsive-fontsize'

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
    align-items: center;
`;

export const Content = styled.View`
    flex: 1;
    margin-top: ${RFPercentage(5)}px;
    width: 99%;
`

export const GoBack = styled.TouchableOpacity`
    height: ${RFPercentage(7)}px;
    width: ${RFPercentage(15)}px;
    border-radius: 5px;
    align-Items: center;
    justify-content: center; 
    margin-top: 20px;
    margin-right: 12px; 
`;

export const Title = styled.Text`
    font-size: 22px;
    color:#5abec8;
    margin: 10px;
    align-self: center;
    font-weight: bold;
`
export const VerticalLine = styled.View`   
    height: 0.2%;
    width: 100%;
    background-color: #909090;
`;
