import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { COLORS, SHADOWS } from '@/constants/theme';
import { router } from 'expo-router';

export default function EnterCodeScreen() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (code.length < 6) {
      setError('Code must be at least 6 characters');
      return;
    }
    // Here you would typically validate the code with your backend
    // For now, we'll just proceed to the follow success screen
    router.push('/follow-success');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Enter Activity Code</Text>
        <Text style={styles.subtitle}>
          Please enter the alphanumeric code for the activity you want to follow
        </Text>

        <TextInput
          style={styles.input}
          value={code}
          onChangeText={(text) => {
            setCode(text.toUpperCase());
            setError('');
          }}
          placeholder="Enter code (e.g. ABC123)"
          placeholderTextColor={COLORS.secondary}
          autoCapitalize="characters"
          maxLength={10}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity 
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    color: COLORS.primary,
    marginBottom: 15,
    ...SHADOWS.small,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    ...SHADOWS.medium,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF6B6B',
    marginBottom: 10,
  },
});
