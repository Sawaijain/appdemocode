import {View, Text, LayoutChangeEvent} from 'react-native';
import React, {useState} from 'react';
import {AppText} from '@/components/AppText';
import {useInventoryStyle} from '../../Inventory/Styles/useInventoryStyle';
import {useTheme} from '@/hooks/useTheme';
import {normalize} from '@/theme/Utils';
import moment from 'moment';
import strings from '@/util/Strings';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';

const Details = ({data, isOrderPage}: {data?: any; isOrderPage?: boolean}) => {
  const inventoryStyle = useInventoryStyle();
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  const [viewDimensions, setViewDimensions] = useState({width: 0, height: 0});
  const {userDetails} = useSelector((state: RootState) => state.auth);
  const onViewLayout = (event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    setViewDimensions({width, height});
  };
  return (
    <React.Fragment>
      <View style={gutter.paddingHorizontal.regular}>
        <View style={layout.row}>
          {isOrderPage ? (
            <React.Fragment>
              <View
                onLayout={onViewLayout}
                style={[inventoryStyle.locationContainer, layout.fill]}>
                <View style={[inventoryStyle.origin]}>
                  <View style={[inventoryStyle.dot, {top: 7}]} />
                  <AppText
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={[
                      inventoryStyle.originLocation,
                      {fontSize: normalize(18)},
                    ]}>
                    {data?.origin?.replace(', India', '')}
                  </AppText>
                  <View
                    style={[
                      inventoryStyle.originLine,
                      {
                        borderStyle: 'solid',
                      },
                    ]}
                  />
                </View>
                <View
                  style={[
                    inventoryStyle.line,
                    {
                      borderStyle: 'solid',
                      height: 50,
                    },
                  ]}
                />
                <View style={[inventoryStyle.origin, {marginTop: -6}]}>
                  <View
                    style={[
                      inventoryStyle.dot,
                      {
                        top: 7,
                        backgroundColor:
                          userDetails?.profileType === 'transporter'
                            ? color.transporter
                            : color.buttonNew,
                      },
                    ]}
                  />
                  <AppText
                    style={[
                      inventoryStyle.originLocation,
                      {fontSize: normalize(18)},
                    ]}>
                    {data?.destination?.replace(', India', '')}
                  </AppText>
                </View>
              </View>
              <View
                style={[
                  inventoryStyle.locationContainer,
                  layout.fill,
                  layout.column,
                  layout.justifyContentBetween,
                  // {maxWidth: normalize(150)},
                ]}>
                <View style={inventoryStyle.origin}>
                  <AppText
                    style={[inventoryStyle.loading, {textAlign: 'right'}]}>
                    {strings.details.loading} (
                    {moment(data?.loadingDate).format('DD/MM/YYYY')})
                  </AppText>
                </View>
                <View style={inventoryStyle.origin}>
                  <AppText
                    style={[inventoryStyle.unloading, {textAlign: 'right'}]}>
                    {strings.details.unloading}
                  </AppText>
                </View>
              </View>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <View
                style={[
                  inventoryStyle.locationContainer,
                  layout.fill,
                  layout.column,
                  layout.justifyContentBetween,
                  {maxWidth: normalize(150)},
                ]}>
                <View style={inventoryStyle.origin}>
                  <AppText style={inventoryStyle.loading}>
                    {strings.details.loading}
                  </AppText>
                  <AppText style={inventoryStyle.loadingDate}>
                    {moment(data?.loadingDate).format('DD/MM/YYYY')}
                  </AppText>
                </View>
                <View style={inventoryStyle.origin}>
                  <AppText style={inventoryStyle.unloading}>
                    {strings.details.unloading}
                  </AppText>
                </View>
              </View>
              <View
                onLayout={onViewLayout}
                style={[inventoryStyle.locationContainer, layout.fill]}>
                <View style={[inventoryStyle.origin]}>
                  <View style={[inventoryStyle.dot, {top: 7}]} />
                  <AppText
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={[
                      inventoryStyle.originLocation,
                      {fontSize: normalize(18)},
                    ]}>
                    {data?.origin?.replace(', India', '')}
                  </AppText>
                  <View
                    style={[
                      inventoryStyle.originLine,
                      {
                        borderStyle: 'solid',
                      },
                    ]}
                  />
                </View>
                <View
                  style={[
                    inventoryStyle.line,
                    {
                      borderStyle: 'solid',
                      height: 50,
                    },
                  ]}
                />
                <View style={[inventoryStyle.origin, {marginTop: -6}]}>
                  <View
                    style={[
                      inventoryStyle.dot,
                      {
                        top: 7,
                        backgroundColor:
                          userDetails?.profileType === 'transporter'
                            ? color.transporter
                            : color.buttonNew,
                      },
                    ]}
                  />
                  <AppText
                    style={[
                      inventoryStyle.originLocation,
                      {fontSize: normalize(18)},
                    ]}>
                    {data?.destination?.replace(', India', '')}
                  </AppText>
                </View>
              </View>
            </React.Fragment>
          )}
        </View>
      </View>
      <View style={inventoryStyle.hrLine} />
    </React.Fragment>
  );
};

export default Details;
