import useShipperStyle from '@/libs/customStyles/ShipperStyle';
import {NavigationBarProps} from '@/libs/navigation/NavigationBarProps';
import React from 'react';
import {SafeAreaView, View} from 'react-native';

interface BaseScreenProps {
  navigatorBarOptions?: NavigationBarProps;
  children: React.ReactNode;
  hideHeaderLine?: boolean;
}

const BaseScreen = ({children}: BaseScreenProps) => {
  const styles = useShipperStyle();
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default BaseScreen;
