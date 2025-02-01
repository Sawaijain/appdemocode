import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {AppText} from '@/components/AppText';
import AppButton from '@/components/AppButton';
import {
  ArrowForwardIcon,
  Button,
  DeleteIcon,
  Popover,
  useToast,
} from 'native-base';
import {useInventoryStyle} from '../Styles/useInventoryStyle';
import {useTheme} from '@/hooks/useTheme';
import moment from 'moment';
import {EditIcon} from '@/components/icons/Icon';
import EditInventory from './EditInventory';
import strings from '@/util/Strings';

const InvertoryComponent = ({
  data,
  handleSubmit,
  handleDelete,
  profileType,
  navigateTo,
}: any) => {
  const [isEditModalShown, setIsEditModalShown] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const style = useInventoryStyle();
  const toast = useToast();
  const {
    style: {gutter},
    value: {color},
  } = useTheme();

  let metricTonValues: number[] = [];
  if (data && data?.inventory?.length > 0)
    for (const item of data?.inventory) {
      metricTonValues.push(item?.metricTon);
    }
  return (
    <View style={style.inventorybox}>
      <View style={style.card}>
        <View style={style.inner}>
          <AppText style={[style.date, {fontSize: 15}]}>
            {moment(data?.availabilityDate).format('LL')}
          </AppText>
        </View>
        <View style={style.locationContainer}>
          <View style={style.origin}>
            <View style={[style.dot, {top: 7}]} />
            <AppText style={style.originLocation}>
              {data?.origin?.name?.replace(', India', '')}
            </AppText>
            <View style={style.originLine} />
          </View>
          <View style={style.line} />
          <View style={[style.origin, {marginTop: -5}]}>
            <View
              style={[
                style.dot,
                {
                  top: 7,
                  backgroundColor:
                    profileType == 'transporter'
                      ? color.transporter
                      : color.buttonNew,
                },
              ]}
            />
            <AppText style={style.originLocation}>
              {data?.destination?.name?.replace(', India', '')}
            </AppText>
          </View>
        </View>
      </View>
      <View style={style.buttonContainer}>
        <AppButton
          buttonStyle={[
            style.outlineButton,
            {
              backgroundColor:
                profileType == 'transporter'
                  ? color.transporterLight
                  : 'rgba(217, 217, 217, 0.33)',
              borderColor:
                profileType == 'transporter'
                  ? color.transporter
                  : color.buttonNew,
            },
          ]}
          label={`${data?.numberOfLoad} लोड`}
          icon={
            <ArrowForwardIcon
              color={
                profileType == 'transporter'
                  ? color.transporter
                  : color.buttonNew
              }
            />
          }
          textColor={
            profileType == 'transporter' ? color.transporter : color.buttonNew
          }
          onPress={() => {
            if (data?.numberOfLoad > 0) navigateTo(data);
            else toast.show({title: strings.inventory.noLoadForToday});
          }}
        />
        <View style={style.weight}>
          <AppText style={style.weights}>
            {metricTonValues?.toString()} MT
          </AppText>
          <Popover
            trigger={(triggerProps) => {
              return (
                <TouchableOpacity
                  {...triggerProps}
                  onPress={() => setIsOpen(true)}
                  style={gutter.marginHorizontal.tiny}>
                  <DeleteIcon
                    color={
                      profileType == 'transporter'
                        ? color.transporter
                        : color.buttonNew
                    }
                    size={5}
                  />
                </TouchableOpacity>
              );
            }}
            isOpen={isOpen}
            onClose={() => setIsOpen(!isOpen)}>
            <Popover.Content accessibilityLabel="Delete" w="56">
              <Popover.Arrow />
              <Popover.CloseButton onPress={() => setIsOpen(false)} />
              <Popover.Header>Delete</Popover.Header>
              <Popover.Body>Are you sure?</Popover.Body>
              <Popover.Footer justifyContent="flex-end">
                <Button.Group space={2}>
                  <Button
                    colorScheme="coolGray"
                    variant="ghost"
                    onPress={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onPress={() => {
                      handleDelete(data?._id);
                      setIsOpen(false);
                    }}
                    colorScheme="danger">
                    Delete
                  </Button>
                </Button.Group>
              </Popover.Footer>
            </Popover.Content>
          </Popover>

          <TouchableOpacity onPress={() => setIsEditModalShown(true)}>
            <EditIcon
              size={20}
              color={
                profileType == 'transporter'
                  ? color.transporter
                  : color.buttonNew
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      {isEditModalShown && (
        <EditInventory
          modalVisible={isEditModalShown}
          onClose={() => setIsEditModalShown(false)}
          handleSubmit={(_inventory) => {
            handleSubmit(_inventory);
            setIsEditModalShown(false);
          }}
          data={data}
        />
      )}
    </View>
  );
};

export default InvertoryComponent;
