import React, {memo, useEffect, useState} from 'react';
import {VStack, Row, View} from 'native-base';
import {Image} from 'react-native';
import moment from 'moment';
import StepIndicator from 'react-native-step-indicator';
import strings from '@/util/Strings';
import componentStyles from './ComponentStyles';
import RoundIcon from './RoundIcon';
import IMAGE_URL from '@/theme/ImageUrl';
import AppButton from '@/components/AppButton';
import NumberSeparatorInstance from '@/libs/ConvertNumber';
import {AppText} from '@/components/AppText';
import {getCommodityLanguage} from '@/libs';
import {navigationRef} from '@/libs/navigation/RootNavigation';
import InTransitInvoiceListPayments from '../../common-pages/InTransitInvoiceListPayments';
import {customStyles} from './LoadpostRequests';

const LoadpostComponent = (props: any) => {
  const [loadPostCurrentPosition, setloadPostCurrentPosition] = useState(0);
  useEffect(() => {
    props?.item?.carrier_quotations?.status == 'accepted'
      ? setloadPostCurrentPosition(1)
      : setloadPostCurrentPosition(0);
  }, []);

  //render() {
  const LoadDetails = props?.item;

  let labelArray = [
    LoadDetails?.origin,
    moment(LoadDetails?.dispatchDate).format('DD-MMM-YY'),
    strings.truck_no + ':' + LoadDetails?.truckNo ? LoadDetails?.truckNo : '',
    LoadDetails?.maskedDestination,
  ];
  return (
    <View
      style={[
        componentStyles.loadContainer,
        {borderWidth: 3, borderColor: '#C8CBCB'},
      ]}>
      <View>
        <Row
          justifyContent="space-between"
          style={{paddingHorizontal: 5, marginTop: 15}}>
          <VStack style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'column'}}>
              <AppText
                mode="defaultBold"
                style={[
                  componentStyles.subHeading,
                  {marginHorizontal: 5, fontSize: 15},
                ]}>
                #{LoadDetails?.orderId}
              </AppText>
              <AppText
                mode="defaultBold"
                style={[{fontSize: 15, marginLeft: 5}]}>
                {moment(LoadDetails?.dispatchDate).format('DD-MMM-YY')}
              </AppText>
            </View>

            {LoadDetails?.carrier_quotations?.status == 'requested' ||
            LoadDetails?.carrier_quotations?.status == 'driver_data_updation' ||
            LoadDetails?.carrier_quotations?.status ==
              'driver_data_updation_done' ? (
              <RoundIcon color={'yellow'} />
            ) : LoadDetails?.carrier_quotations?.status == 'accepted' ? (
              <RoundIcon color={'green'} />
            ) : (
              <></>
            )}
          </VStack>
          <VStack>
            <View
              style={{alignItems: 'flex-end', marginRight: 10, marginTop: 0}}>
              {LoadDetails?.finalRate ? (
                <AppText
                  style={[componentStyles.subHeading, {display: 'none'}]}>
                  .{LoadDetails?.finalRate}/MT
                </AppText>
              ) : (
                <>
                  <AppText
                    style={[componentStyles.subHeading, {display: 'none'}]}>
                    .{LoadDetails?.targetRate}/MT
                  </AppText>
                </>
              )}
              <AppText mode="defaultBold" style={componentStyles.subHeading}>
                {LoadDetails?.tripType === 'Account Pay'
                  ? strings.account_pay
                  : strings.to_pay}
              </AppText>
              <AppText mode="defaultBold" style={componentStyles.subHeading}>
                {LoadDetails?.weight}MT |{' '}
                {getCommodityLanguage(LoadDetails.commodityType)}
              </AppText>
            </View>
          </VStack>
        </Row>
        {LoadDetails?.carrier_quotations?.status === 'accepted' ? (
          <AppText>Truck Number : {LoadDetails?.vehicleNumber}</AppText>
        ) : null}
        <Row style={{minHeight: 90, marginTop: 20}}>
          {labelArray?.length > 0 ? (
            <StepIndicator
              customStyles={customStyles}
              currentPosition={loadPostCurrentPosition}
              labels={labelArray}
              direction={'vertical'}
              stepCount={labelArray.length - 1}
              renderStepIndicator={() => {
                return (
                  <View style={{height: 25, width: 30}}>
                    <Image
                      source={IMAGE_URL.truckIcon}
                      style={{resizeMode: 'contain', width: 25, height: 20}}
                    />
                  </View>
                );
              }}
              renderLabel={(position: {position: number}) => {
                return (
                  <View style={{width: '100%', alignContent: 'flex-start'}}>
                    {position.position == 0 ? (
                      <>
                        <AppText
                          mode="alternative"
                          style={{
                            fontSize: 14,
                            textAlign: 'justify',
                            marginTop: 12,
                          }}>
                          {LoadDetails?.maskedOrigin}
                        </AppText>
                      </>
                    ) : position.position > 2 ? (
                      <AppText
                        mode="alternative"
                        style={{
                          fontSize: 14,
                          maxWidth: 300,
                          textAlign: 'justify',
                        }}>
                        {LoadDetails?.maskedDestination?.trim()}
                      </AppText>
                    ) : (
                      <></>
                    )}
                  </View>
                );
              }}
            />
          ) : (
            <></>
          )}
        </Row>
        {LoadDetails?.carrier_quotations?.status == 'completed' ? (
          <View style={[componentStyles.button, componentStyles.defaultButton]}>
            <AppText style={{fontSize: 20, color: 'green'}}>
              Total Paid : {LoadDetails.total}
            </AppText>
          </View>
        ) : LoadDetails?.carrier_quotations?.status == 'rejected' ? (
          <View style={[componentStyles.button, componentStyles.defaultButton]}>
            <AppText style={{fontSize: 14, color: 'red'}}>Rejected</AppText>
          </View>
        ) : (
          <Row
            justifyContent={'space-between'}
            alignItems="center"
            style={{height: 50, marginTop: 30}}>
            <VStack>
              <AppText
                mode="defaultBold"
                style={[componentStyles.subHeading, {fontSize: 15}]}>
                {strings.total_rs} :{' '}
                {NumberSeparatorInstance.numberSeparator(
                  LoadDetails?.targetRate * LoadDetails?.weight,
                )}
              </AppText>

              {LoadDetails?.paid ? (
                <AppText style={componentStyles.subHeading}>
                  Paid:{LoadDetails.paid}
                </AppText>
              ) : (
                <></>
              )}
            </VStack>
            <VStack>
              {LoadDetails?.balance ? (
                <AppText style={componentStyles.subHeading}>
                  bal:{LoadDetails?.balance}
                </AppText>
              ) : (
                <></>
              )}
              {LoadDetails?.carrier_quotations?.status == 'requested' ? (
                <AppText
                  mode="defaultBold"
                  style={{
                    textAlign: 'right',
                    fontSize: 18,
                  }}>
                  {strings.requested}
                </AppText>
              ) : LoadDetails?.carrier_quotations?.status ==
                'driver_data_updation' ? (
                <AppButton
                  buttonStyle={componentStyles.defaultButton}
                  textColor={'#fff'}
                  label={strings.update_driver_data}
                  onPress={() => props.updateLoadPostdata()}
                />
              ) : LoadDetails?.carrier_quotations?.status ==
                'driver_data_updation_done' ? (
                <AppText
                  mode="defaultBold"
                  style={{
                    textAlign: 'right',
                    fontSize: 18,
                  }}>
                  {strings.driver_data_updated}
                </AppText>
              ) : LoadDetails?.carrier_quotations?.status == 'accepted' &&
                LoadDetails.orderStatus == 'in-transit' ? (
                <AppButton
                  buttonStyle={componentStyles.defaultButton}
                  textColor={'#fff'}
                  label={strings.bilty}
                  onPress={() => {
                    navigationRef.current?.navigate(
                      InTransitInvoiceListPayments.SCREEN_NAME,
                      {orderId: LoadDetails.orderId},
                    );
                  }}
                />
              ) : LoadDetails?.carrier_quotations?.status !== 'accepted' ? (
                <AppButton
                  buttonStyle={componentStyles.defaultButton}
                  textColor={'#fff'}
                  onPress={() => {
                    props?.onPress();
                  }}
                  label={strings.send_request}
                  textStyle={{fontSize: 13}}
                  isElevated
                />
              ) : LoadDetails?.carrier_quotations?.status == 'accepted' ? (
                <AppText
                  mode="defaultBold"
                  style={{
                    textAlign: 'right',
                    fontSize: 18,
                  }}>
                  {strings.bid_accepted}
                </AppText>
              ) : null}
            </VStack>
          </Row>
        )}
      </View>
    </View>
  );
  // }
};
export default memo(LoadpostComponent);
