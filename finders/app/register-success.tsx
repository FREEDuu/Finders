import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import WebMapView from '@/components/WebMapView';
import * as Location from 'expo-location';
import { COLORS, SHADOWS } from '@/constants/theme';

export default function RegisterSuccessScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {location && (
          <WebMapView
            latitude={location.coords.latitude}
            longitude={location.coords.longitude}
            height={Dimensions.get('window').height * 0.5}
            width={Dimensions.get('window').width}
          />
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>Activity Registered!</Text>
        <Text style={styles.subtitle}>Your GPX file has been uploaded</Text>
        
        <View style={styles.coordinatesContainer}>
          {location && (
            <>
              <Text style={styles.coordText}>
                Starting Point:
              </Text>
              <Text style={styles.coordText}>
                Lat: {location.coords.latitude.toFixed(6)}
              </Text>
              <Text style={styles.coordText}>
                Long: {location.coords.longitude.toFixed(6)}
              </Text>
            </>
          )}
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start Recording</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...SHADOWS.medium,
  },
  map: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    ...SHADOWS.medium,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  coordinatesContainer: {
    backgroundColor: COLORS.background,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    ...SHADOWS.small,
  },
  coordText: {
    color: COLORS.primary,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 50,
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
  errorText: {
    color: COLORS.accent,
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});
