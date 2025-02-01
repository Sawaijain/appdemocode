import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Actionsheet, Modal, Radio, useDisclose} from 'native-base';
import strings from '@/util/Strings';
import {AppTextInput} from '@/components/AppTextInput';
import {useTheme} from '@/hooks/useTheme';
import AppButton from '@/components/AppButton';
import {commodities} from '@/util/Commodity';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/AppStore';
interface IProps {
  modalVisible: boolean;
  onClose: () => void;
  onChangeInput: (id: string, value: string) => void;
  request?: any;
  handleSubmit: () => void;
  isOrderPage?: boolean;
}
const TruckFilterModal = ({
  modalVisible,
  onClose,
  onChangeInput,
  request,
  handleSubmit,
  isOrderPage,
}: IProps) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const style = useStyle();
  return (
    <Modal
      size={'xl'}
      isOpen={modalVisible}
      onClose={onClose}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>{strings.loadFilter}</Modal.Header>
        <Modal.Body>
          <View style={style.formGroup}>
            <AppTextInput
              placeholder={strings.truck_number}
              //@ts-ignore
              textInputStyle={style.textInput}
              value={request?.rc_number}
              onChangeText={(text) => onChangeInput('rc_number', text)}
            />
          </View>
          <View style={style.formGroup}>
            <AppTextInput
              placeholder={strings.owner_name}
              //@ts-ignore
              textInputStyle={style.textInput}
              value={request?.owner_name}
              onChangeText={(text) => onChangeInput('owner_name', text)}
            />
          </View>
          <View style={style.formGroup}>
            <AppTextInput
              placeholder={strings.owner_contact_number}
              //@ts-ignore
              textInputStyle={style.textInput}
              value={request?.owner_number}
              onChangeText={(text) => onChangeInput('owner_number', text)}
            />
          </View>

          <View style={style.formGroup}>
            <AppButton
              label={strings.doFilter}
              buttonStyle={style.filterButton}
              textColor={style.color.white}
              onPress={handleSubmit}
            />
          </View>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default TruckFilterModal;
function useStyle() {
  const {
    value: {color},
    style: {layout, gutter},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return {
    ...StyleSheet.create({
      formGroup: {
        ...gutter.marginBottom.regular,
      },
      filterButton: {
        ...layout.justifyContentCenter,
        ...gutter.marginHorizontal.choiceHeight,
        ...gutter.paddingLeft.small,
        ...gutter.paddingRight.small,
        backgroundColor:
          userDetails?.profileType === 'transporter'
            ? color.transporter
            : color.buttonNew,
      },
      textInput: {
        borderColor:
          userDetails?.profileType === 'transporter'
            ? color.transporter
            : color.buttonNew,
        backgroundColor: color.gray50,
      },
      fullWidth: layout.fullWidth,
      tripWrap: {
        ...layout.rowVerticalCenter,
        ...gutter.gap.small,
      },
    }),
    color: color,
  };
}
