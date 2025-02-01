import {View, Text} from 'react-native';
import React, {useRef} from 'react';
import RootNavigator from '@/libs/navigation/RootNavigation';
import TruckBaseScreen from '@/features/base/screens/TruckBaseScreen';
import {useInventoryStyle} from '../Inventory/Styles/useInventoryStyle';
import {GooglePlacesAutocompleteRef} from 'react-native-google-places-autocomplete';
import strings from '@/util/Strings';
import GooglePlaceInput from '@/components/GoogleInput';
import {useTheme} from '@/hooks/useTheme';
import {AppText} from '@/components/AppText';
import FavRoute from './components/FavRoute';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';

const LoadSearchContainer = () => {
  const style = useInventoryStyle();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  const {
    value,
    style: {layout, gutter},
  } = useTheme();
  const originRef = useRef<GooglePlacesAutocompleteRef>(null);
  const destinationRef = useRef<GooglePlacesAutocompleteRef>(null);
  return (
    <TruckBaseScreen
      scrollChildren={
        <View style={style.container}>
          <View style={style.searchUpper}>
            <View style={style.origin}>
              <View style={style.dot} />
              <GooglePlaceInput
                onTapPlace={(text, location) => {
                  originRef.current?.setAddressText(text);
                }}
                style={style.inventoryInput}
                value={strings.inventory.inventoryPlaceholderOrigin}
                ref={originRef}
              />
              <View style={[style.originLine, {top: 20}]} />
            </View>
            <View style={[style.line, {height: 30}]} />
            <View style={[style.origin, {marginTop: -20}]}>
              <View
                style={[
                  style.dot,
                  {
                    backgroundColor:
                      userDetails?.profileType === 'transporter'
                        ? value.color.transporter
                        : value.color.buttonNew,
                  },
                ]}
              />
              <GooglePlaceInput
                ref={destinationRef}
                onTapPlace={(text, location) => {
                  destinationRef.current?.setAddressText(text);
                }}
                style={style.inventoryInput}
                value={strings.inventory.inventoryPlaceholderDestination}
              />
            </View>
          </View>
          <View style={style.favRoute}>
            <AppText mode="contact" style={style.bestRoute}>
              {strings.best_route}
            </AppText>
          </View>
          <FavRoute />
        </View>
      }
    />
  );
};
LoadSearchContainer.SCREEN_NAME = 'LoadSearchContainer';
LoadSearchContainer.navigate = () => {
  RootNavigator.navigate(LoadSearchContainer.SCREEN_NAME);
};
export default LoadSearchContainer;
