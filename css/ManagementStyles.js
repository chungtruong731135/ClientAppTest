import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  head: {
    backgroundColor: 'yellow',
    padding: 20,
    position: 'fixed', 
    width: '100%', 
    zIndex: 1,
  },
  sidebar: {
    width: '100%',
    backgroundColor: '#f4f4f4',
    padding: 20,
    alignItems: 'center',
    marginTop: 40,
  },
  content: {
    padding: 20,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  button: {
    paddingVertical: 15,
    marginBottom: 10,
    backgroundColor: '#ddd',
    alignItems: 'center',
    width: '80%', 
    borderRadius: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },

});

export default styles;
