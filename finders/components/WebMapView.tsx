import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, ActivityIndicator, Platform } from 'react-native';
import { COLORS } from '@/constants/theme';

interface WebMapViewProps {
  latitude: number;
  longitude: number;
  height: number;
  width: number;
  gpxData?: string;
}

export default function WebMapView({ latitude, longitude, height, width, gpxData }: WebMapViewProps) {
  const mapHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.7.0/gpx.min.js"></script>
        <style>
          body { margin: 0; }
          #map { height: 100vh; width: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const map = L.map('map').setView([${latitude}, ${longitude}], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: ' OpenStreetMap contributors'
          }).addTo(map);
          
          ${gpxData ? `
            const gpxParser = new DOMParser();
            const gpxDoc = gpxParser.parseFromString(${gpxData}, 'text/xml');
            new L.GPX(gpxDoc, {
              async: true,
              marker_options: {
                startIconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.7.0/pin-icon-start.png',
                endIconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.7.0/pin-icon-end.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.7.0/pin-shadow.png'
              }
            }).on('loaded', function(e) {
              map.fitBounds(e.target.getBounds());
            }).addTo(map);
          ` : `L.marker([${latitude}, ${longitude}]).addTo(map);`}
        </script>
      </body>
    </html>
  `;

  const containerStyle = StyleSheet.create({
    wrapper: {
      height,
      width,
      overflow: 'hidden',
      borderRadius: 8,
    }
  });

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, containerStyle.wrapper]}>
        <iframe
          src={`data:text/html;charset=utf-8,${encodeURIComponent(mapHTML)}`}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle.wrapper]}>
      <WebView
        source={{ html: mapHTML }}
        style={styles.map}
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        )}
        startInLoadingState
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
});
