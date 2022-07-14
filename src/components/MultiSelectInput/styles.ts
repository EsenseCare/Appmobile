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