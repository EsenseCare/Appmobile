import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ButtonLogin = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.blue_buttons};;
    height: 46px;
    width: 150px;
    border-radius: 10px;
    align-Items: center;
    justify-content: center;
    margin-top: ${RFValue(40)}px;
`;