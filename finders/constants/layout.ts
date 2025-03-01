import { Dimensions, Platform } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  isWeb: Platform.OS === 'web',
  maxContentWidth: 480, // Maximum width for content on web
  contentPadding: Platform.OS === 'web' ? '0 20px' : 20,
};
