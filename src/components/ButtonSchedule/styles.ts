import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.yellow_schedule};
    width: 64px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin-top: 16px;
    margin-left: 12px;
`;

