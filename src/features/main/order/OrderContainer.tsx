import {View, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootNavigator from '@/libs/navigation/RootNavigation';
import TruckBaseScreen from '@/features/base/screens/TruckBaseScreen';
import OrderComponent from './component/OrderComponent';
import {useTheme} from '@/hooks/useTheme';
import {useIsFocused} from '@react-navigation/native';
import {RootState, appDispatch, useAppSelector} from '@/redux/AppStore';
import {getOrderedLoad} from '@/redux/actions/AgLoadAction';
import AppButton from '@/components/AppButton';
import strings from '@/util/Strings';
import FilterIcon from '@/assets/svgs/FilterIcon';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';
import {CloseCircleIcon} from '@/components/icons/Icon';
import FilterModal from '../loads/components/FilterModal';
import {cleanObject, filteredDate, sleep} from '@/libs';
import RenderEmpty from '@/components/RenderEmpty';
import {setOrderLoad} from '@/redux/reducers/agLoadSlice';
import {useSelector} from 'react-redux';

const OrderContainer = () => {
  const [isFilterModalShown, setIsFilterModalShown] = useState<boolean>(false);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [isClear, setIsClear] = useState(false);
  const style = useStyle();
  const isFocus = useIsFocused();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  const [loads, setLoads] = useState<any[]>([]);

  const orderedLoads = useAppSelector((state) => state.agLoad.orderedLoads);
  const [filter, setFilter] = useState<any>({
    origin: '',
    destination: '',
    commodity: '',
    dispatchDate: new Date(),
    vehicleNumber: '',
  });
  useEffect(() => {
    getOrderedLoad(userDetails?.user_id);
  }, [isFocus]);
  useEffect(() => {
    setLoads([...orderedLoads]);
  }, [orderedLoads]);
  const searchLoad = () => {
    setIsFilterModalShown(false);
    setIsClear(true);
    let data: any = {
      commodity: filter.commodity?.value,
      dispatchDate: filter?.dispatchDate,
      destination: filter?.destination,
      origin: filter?.origin,
      vehicleNumber: filter?.vehicleNumber,
      tripType: filter?.tripType,
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
    setLoads([...orderedLoads]);
  };
  const handleOpenFilter = () => {
    setIsFilterModalShown(true);
    setFilter({
      ...filter,
      origin: '',
      destination: '',
      commodity: '',
      dispatchDate: new Date(),
      vehicleNumber: '',
    });
  };
  const onRefresh = React.useCallback(() => {
    appDispatch(setOrderLoad([]));
    setIsRefresh(true);
    getOrderedLoad(userDetails?.user_id);
    sleep(2000).then(() => setIsRefresh(false));
  }, []);
  return (
    <React.Fragment>
      <TruckBaseScreen
        profileType={userDetails?.profileType}
        children={
          <View style={style.orderContainer}>
            <View style={style.filterWrap}>
              <AppButton
                label={strings.filter}
                icon={
                  <FilterIcon
                    color={
                      userDetails?.profileType === 'transporter'
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
                onPress={handleOpenFilter}
              />
            </View>
            {isClear && (
              <AppTouchableOpacity
                onPress={closeClear}
                style={style.clearButton}
                children={<CloseCircleIcon size={20} />}
              />
            )}
            <View>
              <FlatList
                data={loads}
                renderItem={({item}) => <OrderComponent item={item} />}
                keyExtractor={(item, index) => index?.toString()}
                ListEmptyComponent={
                  <RenderEmpty title="अभी तक कोई शिपमेंट नहीं !" />
                }
                onRefresh={onRefresh}
                refreshing={isRefresh}
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View />}
                ListFooterComponentStyle={{height: 200}}
              />
            </View>
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
          isOrderPage
          handleSubmit={searchLoad}
        />
      )}
    </React.Fragment>
  );
};

OrderContainer.SCREEN_NAME = 'OrderContainer';
OrderContainer.navigationOptions = {
  headerShown: false,
};
OrderContainer.navigate = () => {
  RootNavigator.navigate(OrderContainer.SCREEN_NAME);
};

export default OrderContainer;
function useStyle() {
  const {
    style: {layout, gutter},
    value: {color},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return {
    ...StyleSheet.create({
      orderContainer: {
        ...gutter.marginHorizontal.regular,
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
