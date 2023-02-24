import styled from "styled-components/native";
import { RFPercentage } from 'react-native-responsive-fontsize'

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
    margin: 0 5px;
`;

export const Content = styled.View`
    flex: 1;
    margin-top: ${RFPercentage(5)}px;
    width: 99%;
`

export const GoBack = styled.TouchableOpacity`
    position: absolute;
    height: ${RFPercentage(7)}px;
    width: ${RFPercentage(10)}px;
    border-radius: 8px;
    align-Items: center;
    justify-content: center;
    bottom:30px;
    right: 20px;
    background-color: ${({theme}) => theme.colors.blue_buttons};
    border-width: 1px;
    z-index : 1;  
`;

export const Title = styled.Text`
    font-size: 22px;
    color:#5abec8;
    margin: 24px;
    align-self: center;
    font-weight: bold;
`
export const VerticalLine = styled.View`   
    height: 0.2%;
    width: 100%;
    background-color: #909090;
`;

export const FinishButton = styled.TouchableOpacity`
    border-radius: 5px;
    align-Items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.blue_buttons};
    margin: 10px 0;
    height: 46px;
    width: 150px;  
`;

export const CancelButton = styled.TouchableOpacity`
    border: 1px;
    border-radius: 5px;
    align-Items: center;
    justify-content: center;
    margin: 10px 0;
    height: 46px;
    width: 150px;  
`;

export const MoveTopButton = styled.TouchableOpacity`
    border-radius: 5px;
    align-Items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.yellow_schedule};
    margin: 10px 0;
    height: 46px;
    width: 150px;  
`;
