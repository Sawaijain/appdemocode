import React, {Component, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import CustomButon from './CustomButon';
import moment from 'moment';
import DateRangePicker from 'react-native-daterange-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import AppTextField from './AppTextInput';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Dropdown from './Dropdown';
import {AppText} from './AppText';
const CustomFilterModal = (props: {
  onDatePickerClose: (arg0: {startDate: never; endDate: never}) => void;
  modalVisible: boolean | undefined;
  onClose: () => void;
  onChangeStatus: (arg0: string) => void;
  status: string;
  onChangedOriginValue: (arg0: any) => void;
  origin: any;
  onChangeDestinatonValue: (arg0: any) => void;
  dest: any;
  showDatePicker: () => void;
  onChangeTypeValue: (arg0: string) => void;
  trip: string;
  isDatePicker: any;
  applyFilter: () => any;
}) => {
  const [advanceFilter, setAdvanceFilter] = useState(false);
  const [displayedDate, setDisplayedDate] = useState(moment());
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });
  const setDates = (
    dates: React.SetStateAction<{startDate: null; endDate: null}>,
  ) => {
    setSelectedDates({
      ...selectedDates,
      ...dates,
    });
  };
  useEffect(() => {
    if (selectedDates.startDate && selectedDates.endDate) {
      props.onDatePickerClose({
        startDate: selectedDates.startDate,
        endDate: selectedDates.endDate,
      });
    }
  }, [selectedDates.startDate, selectedDates.endDate]);
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 19,
              }}>
              <AppText
                style={{
                  textAlign: 'left',
                  marginVertical: 5,
                  marginLeft: 10,
                  fontSize: 15,
                  flex: 1,
                }}>
                Filter
              </AppText>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  maxWidth: 50,
                  justifyContent: 'flex-end',
                }}
                onPress={() => {
                  props.onClose();
                }}>
                <Entypo size={20} name="circle-with-cross" />
              </TouchableOpacity>
            </View>
            <Dropdown
              data={[
                {label: 'Requested', value: 'requested'},
                {label: 'Vehicle assigned', value: 'vehicle assigned'},
                {label: 'Accepted', value: 'accepted'},
              ]}
              label={props.status || 'Status'}
              onSelect={function (item: any): void {
                props.onChangeStatus(item);
              }}
            />
            <TouchableOpacity onPress={() => setAdvanceFilter(true)}>
              <AppText
                style={{
                  marginVertical: 25,
                  fontSize: 17,

                  marginBottom: 10,
                  marginRight: width * 0.54,
                }}>
                Advanced Filter
              </AppText>
            </TouchableOpacity>
            {advanceFilter && (
              <>
                <AppTextField
                  style={styles.formControl}
                  placeholder="Origin"
                  onChangeText={(text: any) => {
                    props.onChangedOriginValue(text);
                  }}
                  placeholderTextColor="#1a1717"
                  value={props.origin}
                />
                <AppTextField
                  style={styles.formControl}
                  placeholder="Destination"
                  onChangeText={(text: any) => {
                    props.onChangeDestinatonValue(text);
                  }}
                  placeholderTextColor="#1a1717"
                  value={props.dest}
                />
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#edeced',
                    paddingHorizontal: 15,
                    paddingVertical: 12,
                    borderRadius: 10,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                  }}
                  onPress={() => {
                    props.showDatePicker();
                  }}>
                  {selectedDates.startDate && selectedDates.endDate ? (
                    <AppText>
                      {moment(selectedDates.startDate).format('DD/MM/YYYY')}-
                      {moment(selectedDates.endDate).format('DD/MM/YYYY')}
                    </AppText>
                  ) : (
                    <AppText>{moment(new Date()).format('DD/MM/YYYY')}</AppText>
                  )}

                  <EvilIcons name="calendar" size={30} color="black" />
                </TouchableOpacity>
                <Dropdown
                  data={[
                    {label: 'Account Pay', value: 'Account Pay'},
                    {label: 'To Pay', value: 'To Pay'},
                  ]}
                  label={props.trip || 'Trip Type'}
                  onSelect={function (item: any): void {
                    props.onChangeTypeValue(item);
                  }}
                />
                {props.isDatePicker && (
                  <DateRangePicker
                    open={props.isDatePicker}
                    onChange={setDates}
                    endDate={selectedDates.endDate}
                    startDate={selectedDates.startDate}
                    displayedDate={displayedDate}
                    range></DateRangePicker>
                )}
              </>
            )}

            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}>
              <CustomButon
                text="Apply"
                width={Dimensions.get('screen').width * 0.8}
                height={40}
                backgroundColor="#1a1717"
                color="#FFFFFF"
                onPress={() => props.applyFilter()}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CustomFilterModal;
const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255, 0.4)',
  },
  modalView: {
    margin: 0,
    backgroundColor: 'white',
    padding: 5,
    alignItems: 'flex-end',
    height: '100%',
    width: '96%',
    marginRight: -20,
    paddingHorizontal: 10,
  },
  modalView2: {
    margin: 20,
    // backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#1a1717',
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0,
  },
  modalView3: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#1a1717',
    height: 100,
    width: 100,
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 0,
  },
  textStyle: {
    color: 'white',

    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  formControl: {
    borderWidth: 1,
    borderColor: '#edeced',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#191919',
    backgroundColor: '#edeced',
    marginBottom: 20,
    width: 350,
    paddingLeft: 10,
  },
});
