import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import RootNavigator from '@/libs/navigation/RootNavigation';
import BaseScreen from '@/features/base/screens/BaseScreen';
import NumberSeparatorInstance from '@/libs/ConvertNumber';
import {DetentionChartData} from '@/libs/DetentionChart';
import {AppText} from '@/components/AppText';
import strings from '@/util/Strings';
const options: any = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
const DChart = () => {
  return (
    <BaseScreen>
      <ScrollView>
        <View style={{paddingHorizontal: 10, paddingTop: 16}}>
          <View>
            <AppText style={styles.date}>
              {new Date().toLocaleDateString('hi-IN', options)}
            </AppText>
            <View style={styles.header_inner}>
              <AppText style={styles.heading}>
                {strings.dententionChart}
              </AppText>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.row}>
              <View style={[styles.column, styles.bg_black]}>
                <AppText style={styles.h_text}>क्रमांक</AppText>
              </View>
              <View style={[styles.column, styles.bg_black]}>
                <AppText style={styles.h_text}>वज़न (MT)</AppText>
              </View>
              <View style={[styles.column, styles.bg_black]}>
                <AppText style={styles.h_text}>1-2 दिन</AppText>
              </View>
              <View style={[styles.column, styles.bg_black]}>
                <AppText style={styles.h_text}>3+ दिन</AppText>
              </View>
            </View>
            {DetentionChartData.map((ele, i) => (
              <View key={i} style={[styles.row, {borderBottomWidth: 1}]}>
                <View style={[styles.column]}>
                  <AppText style={styles.column_text}>{i + 1}</AppText>
                </View>
                <View style={[styles.column]}>
                  <AppText style={styles.column_text}>{ele.capcity}</AppText>
                </View>
                <View style={[styles.column]}>
                  <AppText style={styles.column_text}>
                    {NumberSeparatorInstance.numberSeparator(
                      Math.round(ele.beforeTwo),
                    )}
                  </AppText>
                </View>
                <View style={[styles.column]}>
                  <AppText style={styles.column_text}>
                    {NumberSeparatorInstance.numberSeparator(
                      Math.round(ele.afterTwo),
                    )}
                  </AppText>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </BaseScreen>
  );
};
DChart.SCREEN_NAME = 'DChart';
DChart.navigationOptions = {
  headerShown: false,
};
DChart.navigate = () => {
  RootNavigator.navigate(DChart.SCREEN_NAME);
};
export default DChart;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 23,
  },
  header: {
    marginTop: 20,
  },
  header_inner: {
    justifyContent: 'center',
    marginBottom: 40,
  },
  date: {
    marginBottom: 40,
  },
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
  bg_black: {backgroundColor: '#1a1717'},
  h_text: {
    color: '#fff',
    fontSize: 13,
    lineHeight: 17,
    padding: 6,
  },
  column_text: {
    fontWeight: '500',
    fontSize: 13,
    padding: 6,
    textTransform: 'capitalize',
  },
  total_heading: {
    color: 'black',
    padding: 8,
  },
  total: {
    color: 'black',
    padding: 8,
  },
  walletBox: {},
  wallet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletCurrentText: {
    color: '#1a1717',

    fontSize: 15,
    paddingLeft: 7,
  },
  walletBalance: {
    color: '#1a1717',

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
    borderColor: '#1a1717',
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
  notestext: {
    color: '#717171',
    fontSize: 14,
    lineHeight: 21,
    marginRight: 14,
    paddingVertical: 10,
  },
});
