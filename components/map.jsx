import {React, useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ActivityIndicator, TouchableOpacity, Button } from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

function TwokMap({route, navigation}){
    const lat = route.params.lat
    const lon = route.params.lon
    
    return (
        <View style={styles.container}>
          <MapView
                style={styles.map}
                initialRegion={{
                    latitude: lat,
                    longitude: lon,
                    latitudeDelta: 1,
                    longitudeDelta: 1,
                }}>
                <Marker
                    coordinate={{latitude: lat, longitude: lon}}
                    title="prova"
                    description = "descrizione"
                />
              </MapView>
            
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });

export default TwokMap;