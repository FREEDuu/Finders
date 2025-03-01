import { StyleSheet, View, ImageBackground, ImageSourcePropType, Platform } from 'react-native';
import Layout from '@/constants/layout';
import { COLORS } from '@/constants/theme';

type ThemedBackgroundProps = {
  children: React.ReactNode;
  image?: ImageSourcePropType;
  overlayOpacity?: number;
};

export function ThemedBackground({ 
  children, 
  image,
  overlayOpacity = 0.6 
}: ThemedBackgroundProps) {
  if (!image) {
    return (
      <View style={[styles.container, { backgroundColor: COLORS.background }]}>
        {children}
      </View>
    );
  }

  return (
    <ImageBackground 
      source={image} 
      style={styles.container}
      imageStyle={styles.backgroundImage}
      resizeMode={Platform.OS === 'web' ? 'cover' : 'cover'}>
      <View style={[styles.overlay, { backgroundColor: `rgba(0,0,0,${overlayOpacity})` }]}>
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Platform.OS === 'web' ? '100vh' : '100%',
  },
  backgroundImage: Platform.OS === 'web' ? {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  } : {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
  },
});
