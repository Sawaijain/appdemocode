import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {AppText} from './AppText';
import {CheckCircleIcon, CloseCircleIcon} from './icons/Icon';
import {FlatList} from 'react-native';
import {useKeyboard} from '@/hooks/useKeyboard';
import AppTouchableOpacity from './AppTouchableOpacity';
const {height, width} = Dimensions.get('window');
interface Option {
  _id: string;
  name: string;
  country: string;
  state: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  searchQuery: string;
  title: string;
  setSearchQuery: (text: string) => void;
  selectedOptions: any[];
  setSelectedOptions: (data: Option[]) => void;
  cityNames?: any;
  color?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  searchQuery,
  setSearchQuery,
  title,
  selectedOptions,
  setSelectedOptions,
  cityNames,
  color,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const isKeyboard = useKeyboard();
  const toggleOption = (option: Option) => {
    const idx = selectedOptions.findIndex(
      (selectedOption) => selectedOption._id === option._id,
    );
    if (idx >= 0) {
      selectedOptions.splice(idx, 1);
    } else {
      selectedOptions.push(option);
    }
    setSelectedOptions([...selectedOptions]);
  };

  const renderOption = (option: Option) => {
    return (
      <TouchableOpacity
        key={option._id}
        onPress={() => toggleOption(option)}
        style={styles.renderOption}>
        <AppText mode="contact">{option.name}</AppText>
        {selectedOptions.some(
          (selectedOption) => selectedOption._id === option._id,
        ) && <CheckCircleIcon size={20} color={color || '#049981'} />}
      </TouchableOpacity>
    );
  };
  const renderOptions = () => {
    if (searchQuery) {
      return (
        <React.Fragment>
          <View style={{height: height * 0.35}}>
            <FlatList
              data={options}
              keyExtractor={(item) => item?._id}
              renderItem={({item}) => renderOption(item)}
              initialNumToRender={10}
              keyboardShouldPersistTaps="handled"
              automaticallyAdjustKeyboardInsets
            />
          </View>
        </React.Fragment>
      );
    }
  };
  const handleClose = () => {
    setModalVisible(false);
    setSearchQuery('');
  };
  const getCitiesName = () => {
    let _cities = selectedOptions?.map((ele) => ele?.name);
    return _cities.map((str) => str.split(',').shift());
  };
  function chunkArray(array: any, chunkSize: any) {
    const chunks = [];
    for (let i = 0; i < array?.length; i += chunkSize) {
      chunks.push(array?.slice(i, i + chunkSize));
    }
    return chunks;
  }
  function removeObjectFromArray(idToRemove: string) {
    const _selectedOption = selectedOptions.filter(
      (item) => item?._id !== idToRemove,
    );
    setSelectedOptions([..._selectedOption]);
  }
  return (
    <React.Fragment>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}>
        <View style={styles.row}>
          <AppText style={{color: color || '#049981'}} mode="description">
            {title}
          </AppText>
          {getCitiesName() && (
            <AppText style={{marginLeft: 10, flex: 1}} mode="description">
              {getCitiesName()?.toString()}
            </AppText>
          )}
        </View>
      </TouchableOpacity>

      <Modal
        style={styles.modal}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleClose}>
        <KeyboardAvoidingView
          style={{flex: 1, padding: 16, zIndex: 1000}}
          enabled={true}
          needsOffscreenAlphaCompositing>
          <ScrollView
            style={{flex: 1}}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={false}>
            <TextInput
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 4,
                padding: 8,
                marginBottom: 16,
              }}
            />

            {renderOptions()}
          </ScrollView>
        </KeyboardAvoidingView>
        <ScrollView keyboardShouldPersistTaps="handled" style={{flex: 0.2}}>
          <View>
            <AppText
              mode="alternative"
              style={[
                styles.selectedText,
                {
                  display: selectedOptions?.length > 0 ? 'flex' : 'none',
                  color,
                  borderBottomColor: color,
                },
              ]}>
              Selected Location
            </AppText>
            <View style={styles.selectedOptionBox}>
              {selectedOptions &&
                selectedOptions?.length > 0 &&
                chunkArray(selectedOptions, 2).map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.selectedOptionRow}>
                    {row?.map((item: any) => (
                      <View
                        key={item?.name}
                        style={[styles.selectedOption, {borderColor: color}]}>
                        <AppText style={{flex: 1}} mode="description">
                          {item?.name?.replace(', India', '')}
                        </AppText>
                        <AppTouchableOpacity
                          onPress={() => removeObjectFromArray(item?._id)}
                          children={
                            <CloseCircleIcon
                              size={30}
                              color={color || '#049981'}
                            />
                          }
                        />
                      </View>
                    ))}
                  </View>
                ))}
            </View>
          </View>
        </ScrollView>
        {!isKeyboard && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.submitButton, {borderColor: color}]}
              onPress={handleClose}>
              <AppText style={{color}} mode="contact">
                Submit
              </AppText>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default MultiSelectDropdown;
const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#575757',
    borderRadius: 10,
    padding: 10,
    height: 77,
    display: 'flex',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  renderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedOptionBox: {
    marginBottom: 20,
    paddingHorizontal: 20,
    width: width,
  },
  selectedOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginLeft: -10,
  },
  selectedOption: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
  },
  selectedText: {
    marginVertical: 20,
    borderBottomWidth: 1,
    paddingBottom: 5,

    paddingLeft: 20,
  },
  modal: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
