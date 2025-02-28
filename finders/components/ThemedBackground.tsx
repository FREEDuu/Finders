import { StyleSheet, View, ImageBackground, ImageSourcePropType } from 'react-native';
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
    <ImageBackground source={image} style={styles.container}>
      <View style={[styles.overlay, { backgroundColor: `rgba(0,0,0,${overlayOpacity})` }]}>
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
});
