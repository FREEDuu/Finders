import { StyleSheet, View, TouchableOpacity, Text, ImageBackground, Platform, ViewStyle, ImageStyle, StyleProp } from 'react-native';
import { router } from 'expo-router';
import { COLORS, SHADOWS } from '@/constants/theme';

const baseStyles = StyleSheet.create({
  background: {
    flex: 1,
  } as ViewStyle,
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  } as ImageStyle,
});

// Type for web-specific styles
type WebViewStyle = ViewStyle & {
  height?: string;
  overflow?: 'hidden' | 'visible' | 'scroll' | 'auto';
};

type WebImageStyle = ImageStyle & {
  position?: 'fixed' | 'absolute' | 'relative' | 'static';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
};

const webStyles = Platform.OS === 'web' ? StyleSheet.create({
  container: {
    height: '100vh',
    overflow: 'hidden',
  } as unknown as WebViewStyle,
  backgroundImage: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  } as unknown as WebImageStyle,
}) : undefined;

export default function ActivityChoiceScreen() {
  const handleStartActivity = () => {
    router.push('/upload-gpx');
  };

  const handleFollowActivity = () => {
    router.push('/enter-code');
  };

  const backgroundStyle: StyleProp<ViewStyle> = Platform.OS === 'web' && webStyles 
    ? StyleSheet.compose(baseStyles.background, webStyles.container as ViewStyle)
    : baseStyles.background;

  const imageStyle: StyleProp<ImageStyle> = Platform.OS === 'web' && webStyles
    ? webStyles.backgroundImage as ImageStyle
    : baseStyles.backgroundImage;

  return (
    <ImageBackground
      source={require('@/assets/images/trail-bg.jpg')}
      style={backgroundStyle}
      imageStyle={imageStyle}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Choose Your Path</Text>
          <Text style={styles.subtitle}>Upload a GPX file or follow an existing activity</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.uploadButton]} 
              onPress={handleStartActivity}
            >
              <Text style={styles.buttonText}>Start Activity</Text>
              <Text style={styles.buttonSubtext}>Begin your adventure</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity 
              style={[styles.button, styles.followButton]} 
              onPress={handleFollowActivity}
            >
              <Text style={styles.buttonText}>Follow Activity</Text>
              <Text style={styles.buttonSubtext}>Join others' trails</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  button: {
    width: '100%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  uploadButton: {
    backgroundColor: COLORS.primary,
  },
  followButton: {
    backgroundColor: COLORS.secondary,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dividerText: {
    color: 'rgba(255,255,255,0.6)',
    paddingHorizontal: 10,
    fontSize: 14,
  },
});
