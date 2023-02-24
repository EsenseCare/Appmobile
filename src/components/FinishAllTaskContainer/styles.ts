import styled from "styled-components/native";

export const Container = styled.View`
    margin: 10px; 
`

export const TaskView = styled.View``

export const VerticalLine = styled.View`   
    height: 1px;
    width: 80%;
    background-color: #909090;
`;

export const StyleInputView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
    align-self: center;
`;

export const CheckboxView = styled.View`
    flex-direction: row;
    align-items: center;
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

