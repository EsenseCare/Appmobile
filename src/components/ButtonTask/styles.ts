import styled from "styled-components/native";

export const Button = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.blue_buttons};
    height: 40px;
    width: 124px;
    border-radius: 4px;
    align-Items: center;
    justify-content: center;
    margin-top: 12px;
    margin-left: 2px;
`;