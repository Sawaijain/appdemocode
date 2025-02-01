import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import {MAX_HEIGHT, MAX_WIDTH, isAndroid} from '@/libs';
import {useTheme} from '@/hooks/useTheme';
import {normalize} from '@/theme/Utils';
import {BackIcon, LocationPinIcon} from '@/components/icons/Icon';
import MapViewDirections, {
  MapViewDirectionsDestination,
} from 'react-native-maps-directions';
import Config from 'react-native-config';
import {isUndefined} from 'lodash';
import {AppText} from '@/components/AppText';
import RootNavigator from '@/libs/navigation/RootNavigation';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
const ASPECT_RATIO = MAX_WIDTH / MAX_HEIGHT;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
interface IProps {
  origin: any;
  destination: any;
  isDriverPage?: boolean;
}
const MapViewComponent = ({origin, destination, isDriverPage}: IProps) => {
  const {userDetails} = useSelector((state: RootState) => state.auth);
  const mapRef = useRef<MapView>(null);
  const markerRef = useRef<any>(null);
  const styles = useStyle();
  const [state, setState] = useState<any>({
    curLoc: {
      latitude: 25.14687,
      longitude: 75.84289,
    },
    destinationCords: {},
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: 25.14687,
      longitude: 75.84289,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    time: 0,
    distance: 0,
    heading: 0,
  });

  const {curLoc, destinationCords, coordinate, heading, distance, time} = state;
  const updateState = (data: any) =>
    setState((state: any) => ({...state, ...data}));

  const animate = (latitude: any, longitude: any) => {
    const newCoordinate: any = {latitude, longitude};
    if (isAndroid) {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };
  const onCenter = () => {
    mapRef.current?.animateToRegion({
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  const fetchTime = (d: any, t: any) => {
    updateState({
      distance: d,
      time: t,
    });
  };

  useEffect(() => {
    if (origin && !isUndefined(origin)) {
      const _distanceCords: MapViewDirectionsDestination = {
        latitude: Number(origin?.location?.latitude),
        longitude: Number(origin?.location?.longitude),
      };
      animate(
        Number(origin?.location?.latitude),
        Number(origin?.location?.longitude),
      );
      updateState({
        curLoc: _distanceCords,
      });
    }
  }, [origin]);

  useEffect(() => {
    if (destination && !isUndefined(destination)) {
      const _distanceCords: MapViewDirectionsDestination = {
        latitude: Number(destination?.location?.latitude),
        longitude: Number(destination?.location?.longitude),
      };
      animate(
        Number(destination?.location?.latitude),
        Number(destination?.location?.longitude),
      );
      updateState({
        destinationCords: _distanceCords,
      });
    }
  }, [destination]);
  const formatDuration = (durationInMinutes: any) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours}h ${minutes?.toFixed(0)}m`;
  };
  return (
    <View
      style={[
        styles.mapWrap,
        {height: isDriverPage ? MAX_HEIGHT / 2 : MAX_HEIGHT / 3.2},
      ]}>
      <MapView
        showsCompass
        showsMyLocationButton
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          ...curLoc,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        {Object.keys(curLoc).length > 0 && <Marker coordinate={curLoc} />}
        {Object.keys(destinationCords).length > 0 && (
          <Marker coordinate={destinationCords} />
        )}

        {Object.keys(destinationCords).length > 0 && (
          <MapViewDirections
            directionsServiceBaseUrl="https://maps.googleapis.com/maps/api/directions/json"
            origin={curLoc}
            destination={destinationCords}
            apikey={String(Config.GOOGLE_API_KEY)}
            strokeWidth={5}
            strokeColor={styles.color.primary}
            optimizeWaypoints={true}
            onStart={(params) => {}}
            onReady={(result) => {
              fetchTime(result.distance, Math.ceil(result.duration));
              mapRef.current?.fitToCoordinates(result.coordinates, {});
            }}
            onError={(errorMessage) => {
              console.log('GOT AN ERROR', errorMessage);
            }}
          />
        )}
      </MapView>
      <View style={styles.bubble}>
        <View style={styles.button}>
          <AppText mode="contact">{parseFloat(distance).toFixed(2)} km</AppText>
          <AppText mode="contact">{formatDuration(time)}</AppText>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.pin,
          {
            backgroundColor:
              userDetails?.profileType === 'transporter'
                ? styles.color.transporter
                : userDetails?.profileType === 'driver'
                ? styles.color.driver
                : styles.color.buttonNew,
          },
        ]}
        onPress={onCenter}>
        <LocationPinIcon size={20} color={styles.color.white} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.pin,
          {
            left: 20,
            backgroundColor:
              userDetails?.profileType === 'transporter'
                ? styles.color.transporter
                : userDetails?.profileType === 'driver'
                ? styles.color.driver
                : styles.color.buttonNew,
          },
        ]}
        onPress={() => RootNavigator.pop()}>
        <BackIcon size={20} color={styles.color.white} />
      </TouchableOpacity>
    </View>
  );
};

export default MapViewComponent;

function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return {
    ...StyleSheet.create({
      pin: {
        position: 'absolute',
        right: 20,
        top: 20,
        backgroundColor:
          userDetails?.profileType === 'transporter'
            ? color.transporter
            : color.buttonNew,
        height: 40,
        width: 40,
        borderRadius: 20,
        ...layout.center,
        elevation: 5,
      },
      mapWrap: {
        height: MAX_HEIGHT / 3.2,
        borderRadius: 20,
        elevation: 5,
        ...layout.modalContent,
        overflow: 'hidden',
      },
      detailwrap: {
        ...gutter.marginHorizontal.small,
        ...gutter.marginVertical.regular,
        borderRadius: 20,
        elevation: 5,
        ...layout.modalContent,
        overflow: 'hidden',
      },
      userbox: {
        borderRadius: 20,
        elevation: 5,
        ...layout.modalContent,
        ...layout.rowVerticalCenter,
        ...gutter.paddingVertical.regular,
        ...gutter.paddingHorizontal.small,
      },
      leftBox: {
        flex: 0.3,
      },
      middle: {...layout.fill},
      right: {flex: 0.1},
      button: {
        backgroundColor: color.background,
        ...gutter.padding.regular,
        borderRadius: 10,
      },
      bubble: {
        borderRadius: 20,
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        bottom: 0,
        ...layout.fullWidth,
        ...layout.center,
      },
    }),
    color: color,
  };
}
