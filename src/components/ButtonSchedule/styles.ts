import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.yellow_schedule};
    width: 84px;
    height: 46px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin-top: 10px;
    margin-left: 12px;
`;

