import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
const componentStyles = StyleSheet.create({
  loadContainer: {
    marginVertical: 5,
    backgroundColor: '#f5f6f6',
    paddingHorizontal: 10,
    paddingTop: 10,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  subHeading: {
    fontSize: 16,
    // marginVertical: 3
  },
  LoadDetails: {
    fontSize: 16,
    marginVertical: 5,
  },
  defaultButton: {
    paddingLeft: 45,
    paddingRight: 45,
    height: 35,
    borderRadius: 5,
  },
  defaultButton2: {
    backgroundColor: '#FFF',
    color: '#000',
    borderRadius: 10,
  },
  mv_10: {
    marginVertical: 10,
  },
  //    ============trip details============================
  tripDetailsContainer: {
    padding: 20,
  },
  tripDetailsHeading: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  tripDetailsText: {
    fontSize: 18,
    marginVertical: 5,
  },
  button: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  defaultMenuButton: {
    backgroundColor: '#fff',
    color: '#000',
  },
  activeButton: {
    color: '#fff',
    backgroundColor: '#000',
  },
  actionSheet: {
    width: '100%',
    backgroundColor: '#000',
    height: 200,
  },
  defaultFullButton: {
    backgroundColor: '#000',
    color: '#fff',
    width: '95%',
    paddingVertical: 50,
    height: 50,
    textAlign: 'center',
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionSheetDefaultButton: {
    width: '50%',
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    borderRadius: 5,
    backgroundColor: '#000',
    paddingVertical: 10,
  },
});
export default componentStyles;
