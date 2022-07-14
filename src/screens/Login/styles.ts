import styled from 'styled-components/native';

import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;   
`;

export const ContainerTwo = styled.View`
    flex: 1;
    width: 450px;
    background-color: ${({theme}) => theme.colors.background};
    align-items: center;
    justify-content: center;   
`;

export const GreetingsText = styled.Text`
    font-weight: bold;
    color: #76838f;
    margin-bottom: 24px;
    margin-top: 24px;
    
`;

export const LogoImg = styled.Image`
    width: ${RFPercentage(98)}px;
    height: ${RFValue(150)}px;
    margin-bottom: ${RFValue(46)}px;
`;

export const HelpButtonSingUp = styled.Text`
    color: #3e8ef7;
    font-size: ${RFValue(16)}px;
    margin-top: ${RFValue(18)}px;
    padding: 5px;
`;

export const HelpButtonPassword = styled.Text`
    color: #3e8ef7;
    font-size: ${RFValue(16)}px;
    padding-left: ${RFPercentage(24)}px;
    flex-direction: row;
`;