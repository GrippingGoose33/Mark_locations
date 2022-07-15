import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import styles from './styles';

const hotelRegion = {
  coordinates: [
    {latitude: 1, longitude: 1},
    {latitude: 1, longitude: 1},
    {latitude: 1, longitude: 1},
    {latitude: 1, longitude: 1},
    {latitude: 1, longitude: 1},
  ],

  strokeColor: "#008080",
  strokeWidth: 4,
}

const barRegion = {
  coordinates: [
    {latitude: 1, longitude: 1},
    {latitude: 1, longitude: 1},
    {latitude: 1, longitude: 1},
    {latitude: 1, longitude: 1},
    {latitude: 1, longitude: 1},
  ],

  strokeColor: "firebrick",
  strokeWidth: 4,
}


export default function App() {
  const [hotelRegion, setHotelStyles] = useState([styles.hotelText, styles.boldText]);
  const [barRegion, setBarStyles] = useState([styles.barText]);
  const [overlays, setOverlays] = useState([hotelRegion]);

  function onClickhotel() {
    setHotelStyles([...hotelStyles, styles.boldText]);
    setBarStyles([barStyles[0]]);
    setOverlays([hotelRegion]);
  }

  function onClickbar() {
    setHotelStyles([...barStyles, styles.boldText]);
    setBarStyles([hotelStyles[0]]);
    setOverlays([barRegion]);
  }


  return (
    <View style={styles.container}>
      <View>
        <Text style={hotelStyles} onPress={onClickhotel}>
          Hoteles y Restaurantes
        </Text>

        <Text style={barStyles} onPress={onClickbar}>
          Hoteles y Restaurantes
        </Text>
      </View>

      <MapView style={styles.mapView}>
        {overlays.map((v, i) => (
          <MapView.Polygon 
            key={i}
            coordinates={v.coordinates}
            strokeColor={v.strokeColor}
            strokeWidth={v.strokeWidth}
          />
        ))}
      </MapView>

    </View>
  )

}