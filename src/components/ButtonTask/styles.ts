import styled from "styled-components/native";
import { RFPercentage } from 'react-native-responsive-fontsize'

export const Button = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.blue_buttons};
    height: 48px;
    width: ${RFPercentage(20)}px;
    border-radius: 4px;
    align-Items: center;
    justify-content: center;
    margin-top: 19px;
    align-self: center;
`;