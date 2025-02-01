import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert, Dimensions} from 'react-native';
import {AppText} from './AppText';
class CustomButon extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          alignItems: this.props.alignItems ? this.props.alignItems : 'center',
          justifyContent: 'center',
          marginVertical: 10,
          marginHorizontal: this.props.marginHorizontal
            ? this.props.marginHorizontal
            : 10,
          borderRadius: 5,
        }}>
        <TouchableOpacity
          disabled={this.props.disabled}
          style={{
            backgroundColor: this.props.backgroundColor
              ? this.props.backgroundColor
              : '#e9cfa3',
            height: this.props.height ? this.props.height : 50,
            paddingHorizontal: 20,
            width: this.props.width
              ? this.props.width
              : Dimensions.get('screen').width * 0.8,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={this.props.onPress}>
          <AppText
            style={{
              fontSize: this.props.isFont === true ? 14 : 17,
              color: this.props.color ? this.props.color : '#1a1717',
              fontFamily: 'Roboto',
              fontWeight: '100',
            }}>
            {this.props.text}
          </AppText>
        </TouchableOpacity>
      </View>
    );
  }
}
export default CustomButon;
