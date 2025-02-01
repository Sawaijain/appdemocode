import {APPCOLORS} from '@/libs/customStyles/ShipperStyle';
import React, {forwardRef, Ref} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';

interface GooglePlaceInputProps {
  style: StyleProp<ViewStyle>;
  onTapPlace: (text: string, location?: any) => void;
  value: string;
  placeholder?: string;
}

const GooglePlaceInput = forwardRef(
  (
    {style, onTapPlace, value, placeholder}: GooglePlaceInputProps,
    ref: Ref<GooglePlacesAutocompleteRef>,
  ) => {
    return (
      <View>
        <GooglePlacesAutocomplete
          ref={ref} // Forward the ref to the inner GooglePlacesAutocomplete component
          placeholder={placeholder ? placeholder : 'Search'}
          onPress={(data, details = null) => {
            onTapPlace(data.description, details?.geometry.location);
          }}
          filterReverseGeocodingByTypes={['administrative_area_level_3']}
          fetchDetails={true}
          query={{
            key: 'AIzaSyD7IPP_3U7QzRDkTylMF4atkWQPgLet74o',
            language: 'en',
          }}
          minLength={2}
          textInputProps={{
            placeholderTextColor: 'black',
          }}
          styles={{
            textInputContainer: style,
            textInput: {
              backgroundColor: 'transparent',
              color: APPCOLORS.darkBlack,
            },
            description: {color: 'black'},
            listView: {
              position: 'absolute',
              top: 40,
              elevation: 5,
              backgroundColor: '#fff',
              width: '100%',
              zIndex: 9999999,
              height: 180,
            },
          }}
        />
      </View>
    );
  },
);

export default GooglePlaceInput;
