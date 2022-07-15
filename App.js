import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import styles from './styles';

const hotelRegion = {
  coordinates: [
    {latitude: 20.672747278747842, longitude: -103.37539720734652},
    {latitude: 20.669673831926215, longitude: -103.37494960785168},
    {latitude: 20.67112893574988, longitude: -103.36900943150502},
    {latitude: 20.673213307650773, longitude: -103.37109064046835},
    {latitude: 20.67335383954868, longitude: -103.3691379924641},
  ],

  strokeColor: "#008080",
  strokeWidth: 4,
}

const barRegion = {
  coordinates: [
    {latitude: 20.671145466079626, longitude: -103.37277506730538},
    {latitude: 20.667069928972786, longitude: -103.37072585978443},
    {latitude: 20.66866100757824, longitude: -103.36802219329526},
    {latitude: 20.671120370739587, longitude: -103.36820458349344},
    {latitude: 20.671145466079626, longitude: -103.37277506730538},
  ],

  strokeColor: "firebrick",
  strokeWidth: 4,
}


export default function App() {
  const [hotelStyles, setHotelStyles] = useState([styles.hotelText, styles.boldText]);
  const [barStyles, setBarStyles] = useState([styles.barText]);
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