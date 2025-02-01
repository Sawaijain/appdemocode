import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Actionsheet,
  AddIcon,
  Button,
  MinusIcon,
  Modal,
  useDisclose,
  useToast,
} from 'native-base';
import {useInventoryStyle} from '../Styles/useInventoryStyle';
import strings from '@/util/Strings';
import {ScrollView} from 'react-native';
import {weightList} from '@/util/Commodity';
import AppButton from '@/components/AppButton';
import {useTheme} from '@/hooks/useTheme';
import {TouchableOpacity} from 'react-native';
import {AppText} from '@/components/AppText';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import Delete from '@/assets/svgs/Delete';
interface IProps {
  modalVisible: boolean;
  onClose: () => void;
  handleSubmit: (inventory: any) => void;
  data?: any;
}
const EditInventory = ({
  onClose: modalClose,
  modalVisible,
  handleSubmit,
  data,
}: IProps) => {
  const [inventory, setInventory] = useState<any>([]);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const style = useInventoryStyle();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const {isOpen, onOpen, onClose} = useDisclose();
  const {
    value,
    style: {layout, gutter},
  } = useTheme();
  useEffect(() => {
    if (data && data?.inventory?.length > 0) {
      setInventory([...data?.inventory]);
    }
  }, [data]);
  const handleChange = (_value: any) => {
    let _inventory = [...inventory];
    if (_inventory && _inventory?.length > 0) {
      _inventory[selectedIndex].metricTon = _value;
    }
    setInventory([..._inventory]);
    onClose();
  };
  const handleUpdateTruck = (buttonType: string, index: number) => {
    let _inventory = [...inventory];
    if (_inventory && _inventory?.length > 0) {
      if (buttonType == 'add') {
        _inventory[index].numberOfTruck += 1;
      } else {
        if (_inventory[index].numberOfTruck > 1)
          _inventory[index].numberOfTruck -= 1;
      }
    }
    setInventory([..._inventory]);
  };
  const handleDelete = (id: string) => {
    let _inventory = inventory?.filter((item: any) => item?._id !== id);
    setInventory([..._inventory]);
  };
  return (
    <Modal
      isOpen={modalVisible}
      onClose={modalClose}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Edit Inventory</Modal.Header>
        <Modal.Body>
          <View>
            {inventory &&
              inventory?.length > 0 &&
              inventory?.map((_item: any, index: any) => (
                <View
                  key={index}
                  style={[
                    layout.rowVerticalCenter,
                    layout.justifyContentBetween,
                    gutter.marginBottom.small,
                    gutter.gap.small,
                  ]}>
                  <AppButton
                    label={`${_item?.metricTon} ${strings.inventory.buttonNames.mt}`}
                    buttonStyle={[
                      style.availabilityAddbtn,
                      {
                        paddingLeft: 15,
                        paddingRight: 15,
                        marginBottom: 0,
                        maxWidth: '100%',
                        ...layout.fill,
                      },
                    ]}
                    textColor={value.color.uploadText}
                    textStyle={style.availabilityAddbtnText}
                    onPress={() => {
                      setSelectedIndex(index);
                      onOpen();
                    }}
                  />
                  <View
                    style={[style.addIcon, {marginRight: 0, ...layout.fill}]}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedIndex(index);
                        handleUpdateTruck('minus', index);
                      }}
                      style={style.minus}>
                      <MinusIcon />
                    </TouchableOpacity>
                    <AppText
                      style={[
                        style.count,
                        layout.fill,
                        layout.textAlignCenter,
                      ]}>
                      {_item?.numberOfTruck}
                    </AppText>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedIndex(index);
                        handleUpdateTruck('add', index);
                      }}
                      style={style.plus}>
                      <AddIcon />
                    </TouchableOpacity>
                  </View>
                  {inventory?.length > 1 && (
                    <AppTouchableOpacity
                      onPress={() => handleDelete(_item?._id)}
                      children={<Delete height={20} width={20} />}
                    />
                  )}
                </View>
              ))}
          </View>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={modalClose}>
              Cancel
            </Button>
            <Button onPress={() => handleSubmit(inventory)}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content style={{height: 300}}>
          <ScrollView style={layout.fullWidth}>
            {weightList.map((item) => (
              <Actionsheet.Item
                onPress={() => {
                  handleChange(item);
                }}
                key={item}>
                {item}
              </Actionsheet.Item>
            ))}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </Modal>
  );
};

export default EditInventory;
