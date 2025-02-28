import { StyleSheet, View, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { COLORS, SHADOWS } from '@/constants/theme';
import { useState } from 'react';

export default function ActivityChoiceScreen() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUploadGPX = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/gpx+xml',
      });

      if (result.type === 'success') {
        setSelectedFile(result);
        router.push('/register-success');
      }
    } catch (err) {
      console.error('Error picking document:', err);
    }
  };

  const handleFollowActivity = () => {
    router.push('/follow-success');
  };

  return (
    <ImageBackground
      source={require('@/assets/images/trail-bg.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Choose Your Path</Text>
          <Text style={styles.subtitle}>Upload a GPX file or follow an existing activity</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.uploadButton]} 
              onPress={handleUploadGPX}
            >
              <Text style={styles.buttonText}>Upload GPX File</Text>
              <Text style={styles.buttonSubtext}>Share your adventure</Text>
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
  background: {
    flex: 1,
  },
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
    height: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  uploadButton: {
    backgroundColor: COLORS.primary,
    marginBottom: 20,
  },
  followButton: {
    backgroundColor: COLORS.secondary,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 5,
  },
  buttonSubtext: {
    color: COLORS.textSecondary,
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
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.textSecondary,
    marginHorizontal: 10,
    fontSize: 16,
  },
});
