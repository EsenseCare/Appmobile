import styled from "styled-components/native";

export const Container = styled.View`

`;

export const PatientName = styled.Text`
    font-weight: bold;
    color: #007bff;
    text-decoration: underline;
    margin-left: 5px;
    font-size: 18px;
`;

export const TaskName = styled.Text`
    font-weight: bold;
    color: ${({theme}) => theme.colors.default_color};
    margin-left: 6px;
    font-size: 18px;
`;

export const Header = styled.View`
    margin-top: 20px;
    border: 2px solid #E5E8E9;
    padding: 12px 5px;
    padding-right: 20px;
    
`;

export const Info = styled.Text`
    font-size: 13px;
    margin-top: 9px;
    margin-left: 4px;
    color: gray;
`;

export const TimeTask = styled.Text`
    color: ${({theme}) => theme.colors.default_color};
    font-size: 14px;
    flex-direction: column-reverse;
`;

export const OpenModalContact = styled.Text`
    margin-left: 12px;
    font-size: 12px;
    color: #2E6EEF;
    margin-top: 10px;
    text-decoration: underline;
`;

export const OpenModalRiskButton = styled.Text`
    background-color: ${({theme}) => theme.colors.danger};
    font-size: 12px;
    color: white;
    border-radius: 8px;
    margin-left: 8px;
    padding: 4px;
`;
