import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Actionsheet, Modal, Radio, useDisclose} from 'native-base';
import strings from '@/util/Strings';
import {AppTextInput} from '@/components/AppTextInput';
import {useTheme} from '@/hooks/useTheme';
import AppButton from '@/components/AppButton';
import {commodities} from '@/util/Commodity';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import DateTimePicker from '@react-native-community/datetimepicker';
import {filteredDate} from '@/libs';
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
const FilterModal = ({
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
  const {isOpen, onOpen, onClose: onActionSheetClose} = useDisclose();
  const [isDatePicker, setIsDatePicker] = useState<boolean>(false);
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
              placeholder={strings.inventory.inventoryPlaceholderOrigin}
              //@ts-ignore
              textInputStyle={style.textInput}
              value={request?.origin}
              onChangeText={(text) => onChangeInput('origin', text)}
            />
          </View>
          <View style={style.formGroup}>
            <AppTextInput
              placeholder={strings.inventory.inventoryPlaceholderDestination}
              //@ts-ignore
              textInputStyle={style.textInput}
              value={request?.destination}
              onChangeText={(text) => onChangeInput('destination', text)}
            />
          </View>
          <AppTouchableOpacity
            onPress={onOpen}
            style={style.formGroup}
            children={
              <AppTextInput
                placeholder={strings.stock}
                //@ts-ignore
                textInputStyle={style.textInput}
                value={request?.commodity?.label}
                onChangeText={(text) => onChangeInput('commodity', text)}
                editable={false}
              />
            }
          />
          <AppTouchableOpacity
            onPress={() => setIsDatePicker(true)}
            style={style.formGroup}
            children={
              <AppTextInput
                placeholder={strings.loadingDate}
                //@ts-ignore
                textInputStyle={style.textInput}
                value={filteredDate(new Date(request?.dispatchDate))}
                editable={false}
              />
            }
          />
          <View style={style.formGroup}></View>
          {isOrderPage && (
            <React.Fragment>
              <View style={style.formGroup}>
                <AppTextInput
                  placeholder={strings.rc}
                  //@ts-ignore
                  textInputStyle={style.textInput}
                  value={request?.vehicleNumber}
                  onChangeText={(text) => onChangeInput('vehicleNumber', text)}
                />
              </View>
              <View style={style.formGroup}>
                <Radio.Group
                  name="tripType"
                  accessibilityLabel="Trip Type"
                  value={request?.tripType}
                  onChange={(nextValue) => {
                    onChangeInput('tripType', nextValue);
                  }}>
                  <View style={style.tripWrap}>
                    <Radio value="Account Pay" my={1}>
                      {strings.account_pay}
                    </Radio>
                    <Radio value="To Pay" my={1}>
                      {strings.to_pay}
                    </Radio>
                  </View>
                </Radio.Group>
              </View>
            </React.Fragment>
          )}
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
      <Actionsheet isOpen={isOpen} onClose={onActionSheetClose}>
        <Actionsheet.Content style={{height: 300}}>
          <ScrollView style={style.fullWidth}>
            {commodities.map((item: any) => (
              <Actionsheet.Item
                onPress={() => {
                  onChangeInput('commodity', item);
                  onActionSheetClose();
                }}
                key={item?.label}>
                {item?.label}
              </Actionsheet.Item>
            ))}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
      {isDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={request?.dispatchDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(_value, selectedDate: any) => {
            setIsDatePicker(false);
            onChangeInput('dispatchDate', selectedDate);
          }}
        />
      )}
    </Modal>
  );
};

export default FilterModal;
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
