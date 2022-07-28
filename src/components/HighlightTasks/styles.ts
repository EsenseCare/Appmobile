import styled from "styled-components/native";

export const Container = styled.View`
`;

export const PatientName = styled.Text`
    font-weight: bold;
    color: #007bff;
    text-decoration: underline;
    margin-left: 5px;
    font-size: 16px;
`;

export const TaskName = styled.Text`
    font-weight: bold;
    color: ${({theme}) => theme.colors.default_color};
    margin-left: 6px;
    font-size: 16px;
`;

export const Header = styled.View`
    font-size: 1px;
    margin-top: 20px;
    border: 2px solid #E5E8E9;
    padding: 12px 0px;
    padding-right: 20px;
`;

export const Info = styled.Text`
    font-size: 11px;
    margin-top: 6px;
    margin-left: 4px;
`;

export const TimeTask = styled.Text`
    color: ${({theme}) => theme.colors.default_color};
    font-size: 15px;
    padding-bottom: 2px
`;