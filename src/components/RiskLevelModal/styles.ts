import styled from 'styled-components/native'
import {RFPercentage} from 'react-native-responsive-fontsize'

export const Container = styled.View`
    flex: auto;
    align-self: center;
    justify-content: center;
    margin-top: 10%;
`;

export const Content = styled.View`
    flex: 0.98;
    width: ${RFPercentage(52)}px;
    padding-top: 10px;
    border-radius: 10px;
    background-color: #f7f7f7;
    border-radius: 16px;
    border: 2px;
    border-color: ${({theme}) => theme.colors.default_color};
`;

export const TextTopicTitle = styled.Text`
    font-size: 20px;
    padding: 12px;
`;  

export const TextTopics = styled.Text`
    font-size: 18px;
    color: #7b838c;
    margin-top: 24px;
    padding: 5px 12px;
`; 

export const CloseButton = styled.TouchableOpacity`   
    background-color: ${({theme}) => theme.colors.blue_buttons};
    height: 48px;
    width: ${RFPercentage(12)}px;
    border-radius: 6px;
    align-Items: center;
    justify-content: center;
    align-self: flex-end;
    margin-right: 16px;
    margin-top: 10px;
`;

export const RatingView = styled.View`
    border-color: ${({theme}) => theme.colors.default_color};
`;

export const ContainerRating = styled.View `
    border-width: 0.6px;
    border-color: ${({theme}) => theme.colors.default_color};
    flex-direction: row; 
    justify-content: space-around;                               
    height: 50px;
    align-items: center;
    margin-top: 2px;
    border-left: unset;
`;

export const ReferenceData = styled.Text`
    font-size: 14px;  
    margin-left: 6px;
    margin-top: 4px;
    color: ${({theme}) => theme.colors.default_color};
`;