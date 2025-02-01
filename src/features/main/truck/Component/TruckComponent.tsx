import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTruckStyle} from '../Styles/useTruckStyle';
import {AppText} from '@/components/AppText';
import {navigationRef} from '@/libs/navigation/RootNavigation';
import AddTruckContainer from '../Screens/AddTruckContainer';
import {getMobileNo} from '@/libs';
import {Linking} from 'react-native';
import {useInventoryStyle} from '../../Inventory/Styles/useInventoryStyle';
import {normalize} from '@/theme/Utils';
import {useTheme} from '@/hooks/useTheme';
import strings from '@/util/Strings';
import Delete from '@/assets/svgs/Delete';
import {showAlert} from '@/components/Alert';
import {useToast} from 'native-base';
import {deleteTruckList, getTruckList} from '@/redux/actions/TruckAction';

const TruckComponent = ({
  data,
  profileType,
  userId,
}: {
  data: any;
  profileType: string;
  userId: string;
}) => {
  const style = useTruckStyle(profileType);
  const inventoryStyle = useInventoryStyle();
  const toast = useToast();
  const {
    style: {layout, gutter},
    value,
  } = useTheme();
  const deleteID = {
    user_id: userId,
    vehicle_id: data?.vehicle_id,
  };
  return (
    !data?.deleted && (
      <TouchableOpacity
        style={style.truckListWrap}
        onPress={() => {
          navigationRef.current?.navigate(AddTruckContainer.SCREEN_NAME, {
            isEdit: true,
            item: data,
          });
        }}>
        {profileType === 'transporter' && (
          <View style={[style.truckPMT, layout.justifyContentEnd]}>
            <View style={[layout.rowVerticalCenter]}>
              <TouchableOpacity
                onPress={() => {
                  showAlert({
                    message: 'Are you sure you want to delete?',
                    buttons: [
                      {
                        title: 'Okay',
                        onPress: () => {
                          deleteTruckList(deleteID, (success, message) => {
                            if (success) {
                              toast.show({title: message});
                              getTruckList(userId);
                            } else {
                              toast.show({title: message});
                            }
                          });
                        },
                      },
                    ],
                  });
                }}>
                <Delete height={25} width={25} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {profileType === 'fleet-owner' && !data?.first_truck ? (
          <View style={[style.truckPMT, layout.justifyContentEnd]}>
            <View style={[layout.rowVerticalCenter]}>
              <TouchableOpacity
                onPress={() => {
                  showAlert({
                    message: 'Are you sure you want to delete?',
                    buttons: [
                      {
                        title: 'Okay',
                        onPress: () => {
                          deleteTruckList(deleteID, (success, message) => {
                            if (success) {
                              toast.show({title: message});
                              getTruckList(userId);
                            } else {
                              toast.show({title: message});
                            }
                          });
                        },
                      },
                      {
                        title: 'Cancel',
                        onPress: () => {},
                      },
                    ],
                  });
                }}>
                <Delete height={25} width={25} />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        <View style={style.middleview}>
          <View style={[inventoryStyle.locationContainer, style.fill]}>
            <View style={inventoryStyle.origin}>
              {/* <View style={[inventoryStyle.dot, {top: 7}]} /> */}
              <AppText
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  inventoryStyle.originLocation,
                  {fontSize: normalize(18), marginLeft: 0},
                ]}>
                {data?.rc_number}
              </AppText>
              {/* <View
                style={[inventoryStyle.originLine, {borderStyle: 'solid'}]}
              /> */}
            </View>
            {/* <View
              style={[inventoryStyle.line, {borderStyle: 'solid', height: 20}]}
            /> */}
            {/* <View style={[inventoryStyle.origin, {marginTop: -10}]}> */}
            {/* <View
                style={[
                  inventoryStyle.dot,
                  {
                    top: 7,
                    backgroundColor:
                      profileType == 'transporter'
                        ? value.color.transporter
                        : value.color.buttonNew,
                  },
                ]}
              /> */}
            {/* <AppText
                style={[
                  inventoryStyle.originLocation,
                  {fontSize: normalize(18)},
                ]}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {data?.destination?.name}
              </AppText> */}
            {/* </View> */}
          </View>
          <View style={style.fill}>
            <AppText style={[style.truckOrwer, {marginBottom: 12}]}>
              मालिक - {data?.owner_name}
            </AppText>
            <AppText
              onPress={() => Linking.openURL(`tel:${data?.owner_number}`)}
              style={style.truckOrwer}>
              {strings.owner_contact_number} - {getMobileNo(data?.owner_number)}
            </AppText>
          </View>
        </View>
      </TouchableOpacity>
    )
  );
};

export default TruckComponent;
