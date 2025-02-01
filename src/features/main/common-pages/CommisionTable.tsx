/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import strings from '@/util/Strings';
import {AppText} from '@/components/AppText';
import {commisionTableData} from '@/util/Commodity';
import NumberSeparatorInstance from '@/libs/ConvertNumber';
import RootNavigator from '@/libs/navigation/RootNavigation';
var options: any = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
const CommisionTableContainer = () => {
  return (
    <ScrollView>
      <View style={{paddingHorizontal: 16, paddingTop: 16}}>
        <View>
          <AppText style={styles.date}>
            {new Date().toLocaleDateString('hi-IN', options)}
          </AppText>
          <View style={styles.header_inner}>
            <AppText mode="defaultBold" style={styles.heading}>
              {strings.commisionTable}
            </AppText>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={[styles.column, styles.bg_black]}>
              <AppText style={styles.h_AppText}>{'वजन (मेट्रिक टन)'}</AppText>
            </View>
            <View style={[styles.column, styles.bg_black]}>
              <AppText style={styles.h_AppText}>{'लोकल लेन'}</AppText>
            </View>
            <View style={[styles.column, styles.bg_black]}>
              <AppText style={styles.h_AppText}>{'बाहरी लेन'}</AppText>
            </View>
          </View>
          {commisionTableData &&
            commisionTableData.map((ele, i) => (
              <View key={i} style={[styles.row, {borderBottomWidth: 1}]}>
                <View style={[styles.column]}>
                  <AppText
                    style={[
                      styles.column_AppText,
                      {textTransform: 'uppercase'},
                    ]}>
                    {ele.weight}
                  </AppText>
                </View>
                <View style={[styles.column]}>
                  <AppText style={styles.column_AppText}>
                    {' '}
                    {NumberSeparatorInstance.numberSeparator(
                      Math.round(ele.localRate),
                    )}
                  </AppText>
                </View>
                <View style={[styles.column]}>
                  <AppText style={styles.column_AppText}>
                    {' '}
                    {NumberSeparatorInstance.numberSeparator(
                      Math.round(ele.outerRate),
                    )}
                  </AppText>
                </View>
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};
CommisionTableContainer.SCREEN_NAME = 'CommisionTableContainer';
CommisionTableContainer.navigate = () => {
  RootNavigator.navigate(CommisionTableContainer.SCREEN_NAME);
};
export default CommisionTableContainer;
const fontFamily = 'Roboto_medium';
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 23,
  },
  header: {
    marginTop: 10,
  },
  header_inner: {
    justifyContent: 'center',
    marginVertical: 20,
  },
  date: {},
  heading: {
    fontSize: 20,
    lineHeight: 24,
    color: 'black',
    textAlign: 'center',
  },
  table: {
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    borderLeftWidth: 0,
  },
  bg_black: {backgroundColor: '#000'},
  h_AppText: {
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 18,
    padding: 8,
  },
  column_AppText: {
    fontWeight: '500',
    fontSize: 13,
    color: '#6A6A6A',
    padding: 6,
    textAlign: 'center',
    AppTextTransform: 'capitalize',
  },
  total_heading: {
    color: 'black',
    padding: 8,
    textAlign: 'center',
  },
  total: {
    color: 'black',
    padding: 8,
    textAlign: 'center',
  },
  walletBox: {},
  wallet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletCurrentAppText: {
    color: '#121212',
    fontFamily: fontFamily,
    fontSize: 15,
    paddingLeft: 7,
  },
  walletBalance: {
    color: '#121212',
    fontFamily: fontFamily,
    fontSize: 15,
  },
  customCheck: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    height: 20,
    width: 20,
    backgroundColor: 'black',
  },
  defaultCheck: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: '#121212',
  },
  checkLabel: {
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 20,
  },
  notesSection: {
    marginBottom: 30,
  },
  notesWrap: {},
  notesHeading: {
    fontWeight: '500',
    fontSize: 16,
  },
  notesAppText: {
    color: '#717171',
    fontSize: 14,
    lineHeight: 21,
    marginRight: 14,
    paddingVertical: 10,
  },
});
