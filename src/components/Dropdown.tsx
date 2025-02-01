//@ts-nocheck
import {APPCOLORS} from '@/libs/customStyles/ShipperStyle';
import {normalize} from '@/libs/Utils';
import React, {FC, ReactElement, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  ViewStyle,
} from 'react-native';
import {AppText} from './AppText';
import {ChevronIcon} from './icons/Icon';

interface Props {
  label: string;
  data: Array<{label: string; value: string}>;
  onSelect: (item: any) => void;
  style?: ViewStyle;
}

const Dropdown: FC<Props> = ({label, data, onSelect, style}) => {
  const DropdownButton = useRef<TouchableOpacity>(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    DropdownButton.current.measure(
      (_fx: any, _fy: any, _w: any, h: any, _px: any, py: any) => {
        setDropdownTop(py + h);
      },
    );
    setVisible(true);
  };

  const onItemPress = (item: any): void => {
    setSelected(item);
    onSelect(item.value);
    setVisible(false);
  };

  const renderItem = ({item}): ReactElement<any, any> => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <AppTypography style={styles.text}>{item.label}</AppTypography>
    </TouchableOpacity>
  );

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.overlay}
          onPress={() => setVisible(false)}>
          <View style={[styles.dropdown, {top: dropdownTop}]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled
              nestedScrollEnabled
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={[styles.button, style]}
      onPress={toggleDropdown}>
      {renderDropdown()}
      <AppText style={styles.buttonText}>{label}</AppText>
      <ChevronIcon
        direction="down"
        color="black"
        style={styles.icon}
        size={20}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F3F3',
    height: 50,
    zIndex: 1,
    marginBottom: 10,
    borderRadius: normalize(13),
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    color: APPCOLORS.black,
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '90%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
    marginHorizontal: 20,
    elevation: 9,
    maxHeight: 200,
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F3F3',
  },
  text: {
    color: 'black',
  },
});

export default Dropdown;
