import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootNavigator from '@/libs/navigation/RootNavigation';
import TruckBaseScreen from '@/features/base/screens/TruckBaseScreen';
import {useIsFocused} from '@react-navigation/native';
import {useTheme} from '@/hooks/useTheme';
import HeaderButton from './components/HeaderButton';
import AccountPayComponent from './components/AccountPayComponent';
import AppButton from '@/components/AppButton';
import strings from '@/util/Strings';
import FilterIcon from '@/assets/svgs/FilterIcon';
import FilterModal from './components/FilterModal';
import {RootState, appDispatch, useAppSelector} from '@/redux/AppStore';
import {getRequestLanesLoad} from '@/redux/actions/AgLoadAction';
import {cleanObject, filteredDate} from '@/libs';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {CloseCircleIcon} from '@/components/icons/Icon';
import {setRequestedLaneLoad} from '@/redux/reducers/agLoadSlice';
import {useSelector} from 'react-redux';
import RenderEmpty from '@/components/RenderEmpty';
const wait = (timeout: number | undefined) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const ActiveLoadContainer = () => {
  const [tabName, setTabName] = useState<'Account Pay' | 'To Pay'>(
    'Account Pay',
  );
  const [filter, setFilter] = useState<any>({
    origin: '',
    destination: '',
    commodity: '',
    dispatchDate: new Date(),
  });
  const [loads, setLoads] = useState<any[]>([]);
  const [isFilterModalShown, setIsFilterModalShown] = useState<boolean>(false);
  const [isClear, setIsClear] = useState(false);
  const style = useStyle();
  const isFocus = useIsFocused();
  const userDetails = useAppSelector((state) => state.auth.userDetails);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getRequestLanesLoad(userDetails?.user_id);
  }, [isFocus, tabName]);
  const requestedLaneLoads = useAppSelector(
    (state) => state.agLoad.requestedLaneLoads,
  );
  useEffect(() => {
    const filteredLoad = requestedLaneLoads?.filter(
      (ele) => ele?.tripType === tabName,
    );
    setLoads([...filteredLoad]);
  }, [tabName, requestedLaneLoads]);
  const searchLoad = () => {
    setIsFilterModalShown(false);
    setIsClear(true);
    let data: any = {
      commodity: filter.commodity?.value,
      dispatchDate: filter.dispatchDate,
      destination: filter.destination,
      origin: filter.origin,
    };
    data = cleanObject(data);
    var filteredData = loads?.filter((load) => {
      return Object.keys(data).every((propertyName) => {
        if (propertyName === 'dispatchDate') {
          if (!data.dispatchDate) return true;
          const loadDate = filteredDate(new Date(load.dispatchDate));
          const filterDate = filteredDate(new Date(data.dispatchDate));
          return loadDate === filterDate;
        }
        return load[propertyName]
          ?.toLowerCase()
          ?.includes(data[propertyName]?.toLowerCase());
      });
    });
    setLoads([...filteredData]);
  };
  const closeClear = () => {
    setIsClear(false);
    const filteredLoad = requestedLaneLoads?.filter(
      (ele) => ele?.tripType === tabName,
    );
    setLoads([...filteredLoad]);
  };
  const onRefresh = React.useCallback(() => {
    appDispatch(setRequestedLaneLoad([]));
    setRefreshing(true);
    wait(1000).then(() => {
      getRequestLanesLoad(userDetails?.user_id);
      setRefreshing(false);
    });
  }, [refreshing]);
  return (
    <React.Fragment>
      <TruckBaseScreen
        profileType={userDetails?.profileType}
        children={
          <View style={style.container}>
            <HeaderButton onPress={setTabName} tabName={tabName} />
            <View style={style.filterWrap}>
              <AppButton
                label={strings.filter}
                icon={
                  <FilterIcon
                    color={
                      userDetails?.profileType == 'transporter'
                        ? style.color.transporter
                        : style.color.buttonNew
                    }
                  />
                }
                textColor={
                  userDetails?.profileType === 'transporter'
                    ? style.color.transporter
                    : style.color.buttonNew
                }
                buttonStyle={style.filterButton}
                onPress={() => setIsFilterModalShown(true)}
              />
            </View>
            {isClear && (
              <AppTouchableOpacity
                onPress={closeClear}
                style={style.clearButton}
                children={<CloseCircleIcon size={20} />}
              />
            )}
            <FlatList
              data={loads}
              renderItem={({item}) => <AccountPayComponent item={item} />}
              keyExtractor={(item, index) => index?.toString()}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListFooterComponent={<View />}
              ListFooterComponentStyle={{height: 200}}
              ListEmptyComponent={
                <RenderEmpty title="अभी तक कोई शिपमेंट नहीं !" />
              }
            />
          </View>
        }
      />
      {isFilterModalShown && (
        <FilterModal
          modalVisible={isFilterModalShown}
          onClose={() => setIsFilterModalShown(false)}
          request={filter}
          onChangeInput={(id, value) => {
            setFilter({
              ...filter,
              [id]: value,
            });
          }}
          handleSubmit={searchLoad}
        />
      )}
    </React.Fragment>
  );
};
ActiveLoadContainer.SCREEN_NAME = 'ActiveLoadContainer';
ActiveLoadContainer.navigate = () => {
  RootNavigator.navigate(ActiveLoadContainer.SCREEN_NAME);
};
export default ActiveLoadContainer;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return {
    ...StyleSheet.create({
      container: {
        ...gutter.paddingHorizontal.regular,
      },
      filterWrap: {
        ...layout.alignItemsEnd,
        ...gutter.marginVertical.regular,
      },
      filterButton: {
        backgroundColor: color.transparent,
        borderWidth: 1,
        borderColor:
          userDetails?.profileType === 'transporter'
            ? color.transporter
            : color.buttonNew,
        borderRadius: 8,
        paddingLeft: 12,
        paddingRight: 12,
      },
      clearButton: {
        ...layout.alignItemsEnd,
      },
    }),
    color: color,
  };
}
