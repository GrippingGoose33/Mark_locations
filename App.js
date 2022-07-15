import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import styles from './styles';

const API_KEY = "";
const URL = `https://maps.google.com/maps/api/geocode/json?key=${API_KEY}&latlng`;

export default function App() {
  const [address, setAddress] = useState("loading...");
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();

  useEffect (() => {
    function setPosition({coords: {latitude, longitude}}) {
      setLongitude(longitude);
      setLatitude(latitude);
      fetch(`${URL}${latitude}${longitude}`)
        .then((resp) => resp.json())
        .then(({results}) => {
          if(result.length > 0) {
            setAddress(results[0].formatted_address);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    let watcher;

    (async () => {
      let {status} = await Location.requestBackgroundPermissionsAsync();

      if(status != "granted") {
        serErrorMsg("Permision denied");
        return; 
      }

      let location = await Location.getCurrentPositionAsync({});
      setPosition(location);


      watcher = await Location.watchPositionAsync(
        {accuracy: Location.LocationAccuracy.Highest},
      );
    })();

    return () => {
      watcher?.remove();
    };

  }, []);

  return (
    <View style={styles.constainer}>
      <MapView 
        style={styles.mapView} 
        showsUserLocation 
        followsUserLocation 
      >
        <MapView.Marker
          title = "Uniat"
          description= "Sin examen prro"
          coordinate={{
            latitude: 20.65182244959703,
            longitude: -103.40273564506012
          }}
        />
                <MapView.Marker
          title = "Plaza del sol"
          description= "A comer tacos"
          coordinate={{
            latitude: 20.651233074240217,
            longitude: -103.40177509132712
          }}
        />
      </MapView>
    </View>
  )

}