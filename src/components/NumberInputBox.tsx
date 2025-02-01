import React, {Component} from 'react';
import {View, TextInput} from 'react-native';
//import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import {APPCOLORS} from '@/libs/customStyles/ShipperStyle';
class NumberInputBox extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          borderRadius: 5,
          borderWidth: this.props.border ? 0 : 1,
          height: this.props?.height ? this.props.height : 50,
          width: this.props?.width ? this.props.width : '95%',
          marginVertical: 5,
          borderColor: this.props?.borderColor
            ? this.props?.borderColor
            : '#bcbcbc',
          backgroundColor: this.props?.backgroundColor || '#edeced',
          alignSelf: 'center',
          flexDirection: 'row',
        }}>
        <TextInput
          style={{
            flex: 8,
            height: '100%',
            marginTop: 3,
            fontSize: 16,
            paddingLeft: 10,
            alignItems: 'center',
            paddingTop: 5,
            textAlign: this.props.textAlign === true ? 'center' : 'left',
            color: this.props?.color ? this.props?.color : '#1a1717',
          }}
          keyboardType={this.props.ktype ? this.props.ktype : 'number-pad'}
          placeholderTextColor={APPCOLORS.darkBlack}
          placeholder={this.props.placeholder}
          maxLength={this.props?.max}
          onChangeText={this.props.onChangeText}
          editable={this.props?.editable}
          value={this.props.value}></TextInput>
        {this.props.type == 'material-community-icons' ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <MaterialCommunityIcon
              name={this.props.name}
              size={18}
              color={'rgba(0,0,0,0.35)'}
            />
          </View>
        ) : this.props.type == 'material-icon' ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <MaterialIcon
              name={this.props.name}
              size={18}
              color={'rgba(0,0,0,0.35)'}
            />
          </View>
        ) : this.props.type == 'font-awesome' ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <FontAwesome
              name={this.props.name}
              size={16}
              color={
                this.props.blurcolor ? this.props.blurcolor : 'rgba(0,0,0,0.35)'
              }
            />
          </View>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <SimpleLine
              name={this.props.name}
              size={14}
              color={'rgba(0,0,0,0.35)'}
            />
          </View>
        )}
      </View>
    );
  }
}
export default NumberInputBox;
