import { StyleSheet, View, TextInput, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { COLORS, SHADOWS } from '@/constants/theme';

export default function VerificationScreen() {
  const [code, setCode] = useState('');

  const handleVerify = () => {
    router.push('/activity-choice');
  };

  return (
    <ImageBackground
      source={require('@/assets/images/compass-bg.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Verification Code</Text>
          <Text style={styles.subtitle}>Enter the 6-digit code sent to your email</Text>

          <View style={styles.codeContainer}>
            <TextInput
              style={styles.input}
              placeholder="000000"
              placeholderTextColor={COLORS.textSecondary}
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>Continue Journey</Text>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
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
    marginBottom: 40,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  codeContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    ...SHADOWS.medium,
  },
  input: {
    height: 60,
    fontSize: 32,
    textAlign: 'center',
    letterSpacing: 20,
    color: COLORS.text,
  },
  button: {
    height: 55,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
  },
});
