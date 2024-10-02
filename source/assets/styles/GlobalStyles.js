import { StyleSheet } from 'react-native';
import { Colors } from './Colors';


const globalStyles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  shadow: {
    shadowColor: Colors.grey,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.33,
    shadowRadius: 8.32,
    elevation: 10,
  }
});

export default globalStyles;
