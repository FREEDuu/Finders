import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { COLORS, SHADOWS } from '@/constants/theme';

export default function FollowSuccessScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="You are here"
              description="Your current location"
            />
          </MapView>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>Ready to Follow!</Text>
        <Text style={styles.subtitle}>Your current location has been detected</Text>
        
        <View style={styles.coordinatesContainer}>
          {location && (
            <>
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
          <Text style={styles.buttonText}>Start Following</Text>
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
    backgroundColor: COLORS.secondary,
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
