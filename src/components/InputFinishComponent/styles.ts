import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  main:{
    width: '100%'
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

  inputView: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
  },

  checkBox: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 10,
    marginLeft: -10
  },

  InputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    width:'105%',
    alignSelf: 'center'
  }
});
  