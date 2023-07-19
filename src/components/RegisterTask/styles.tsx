import { StyleSheet } from 'react-native';
import styled from "styled-components/native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  content: {
    width: 380,
    backgroundColor: '#F6F4F4',
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,  
  },

  title: {
    fontSize: 20,
    color: '#5abec8',
    margin: 10
  },

  table: {
    alignSelf: 'stretch',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    margin: 8,
    borderBottomWidth: 0.3,
    flexWrap: 'wrap'
  },

  textButton: {
    color: 'white',
    fontSize: 15,
  },

  stylesButton: {
    marginBottom: 10,
    width: 254
  },

  footerInfo: {
    marginRight: 6,
    width: 300,
  },

  buttonCancel: {
    height: 40,
    width: 120,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: 'white',
    borderWidth: 0.5
  },

  checkBox: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 10,
    marginLeft: -10
  },

  InputView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
    width:'105%',
    alignSelf: 'center'
  }
});

export const Data = styled.Text`
  margin-bottom: 14px;
`;


