import {useSignInStyle} from '@/features/auth/styles/useSignInStyle';
import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

interface CustomCheckboxProps {
  isChecked: boolean;
  onToggle: (checked: boolean) => void;
  profileType?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  isChecked,
  onToggle,
  profileType,
}) => {
  const [checked, setChecked] = useState(isChecked);

  const toggleCheckbox = () => {
    const newCheckedState = !checked;
    setChecked(newCheckedState);
    onToggle(!checked);
  };
  const styles = useSignInStyle(profileType);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={toggleCheckbox}>
      <View
        style={[styles.checkbox, checked ? styles.checked : styles.unchecked]}
      />
    </TouchableOpacity>
  );
};

export default CustomCheckbox;
