import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  WindowSize: {
    width: width,
    height: height,
  },
  IsSmallDevice: width < 375,
};
