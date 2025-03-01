import { StyleSheet, View, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { useState } from 'react';
import { COLORS, SHADOWS } from '@/constants/theme';
import { router } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import WebMapView from '@/components/WebMapView';

export default function UploadGpxScreen() {
  const [error, setError] = useState('');
  const [gpxContent, setGpxContent] = useState<string | null>(null);
  const [initialLocation, setInitialLocation] = useState({
    latitude: 40.7128,  // Default to New York City
    longitude: -74.0060
  });

  const handleUploadGpx = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/gpx+xml',
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        
        // Read the GPX file content
        const response = await fetch(file.uri);
        const content = await response.text();
        setGpxContent(content);

        // Parse initial coordinates from GPX
        if (Platform.OS === 'web') {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(content, 'text/xml');
          const trkpt = xmlDoc.querySelector('trkpt');
          if (trkpt) {
            const lat = parseFloat(trkpt.getAttribute('lat') || '0');
            const lon = parseFloat(trkpt.getAttribute('lon') || '0');
            setInitialLocation({ latitude: lat, longitude: lon });
          }
        }
      }
    } catch (err) {
      setError('Error uploading GPX file');
      console.error('Error:', err);
    }
  };

  const handleStartWithoutGpx = () => {
    router.push('/register-success');
  };

  return (
    <View style={styles.container}>
      {gpxContent && (
        <View style={styles.mapContainer}>
          <WebMapView
            latitude={initialLocation.latitude}
            longitude={initialLocation.longitude}
            height={300}
            width={Platform.OS === 'web' ? Dimensions.get('window').width : 400}
            gpxData={gpxContent}
          />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title}>Start Your Activity</Text>
        <Text style={styles.subtitle}>
          Choose how you want to start your activity
        </Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity 
          style={styles.button}
          onPress={handleUploadGpx}
        >
          <Text style={styles.buttonText}>Upload GPX File</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]}
          onPress={handleStartWithoutGpx}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Start Without GPX
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    width: Platform.OS === 'web' ? '100%' : Dimensions.get('window').width,
    height: 300,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
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
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: COLORS.primary,
  },
  errorText: {
    color: '#FF6B6B',
    marginBottom: 10,
  },
});
