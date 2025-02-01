import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import RootNavigator from '@/libs/navigation/RootNavigation';
import {useTruckStyle} from '../Styles/useTruckStyle';
import TruckBaseScreen from '@/features/base/screens/TruckBaseScreen';
import AppButton from '@/components/AppButton';
import strings from '@/util/Strings';
import {useTheme} from '@/hooks/useTheme';
import {AppTextInput} from '@/components/AppTextInput';
import TruckComponent from '../Component/TruckComponent';
import {useIsFocused} from '@react-navigation/native';
import {getTruckList} from '@/redux/actions/TruckAction';
import {RootState} from '@/redux/AppStore';
import {useSelector} from 'react-redux';
import AddTruckContainer from './AddTruckContainer';
import {cleanObject, sleep} from '@/libs';
import RenderEmpty from '@/components/RenderEmpty';
import FilterIcon from '@/assets/svgs/FilterIcon';
import {AddCircleIcon, CloseCircleIcon} from '@/components/icons/Icon';
import TruckFilterModal from '../Component/TruckFilterModal';
import AppTouchableOpacity from '@/components/AppTouchableOpacity';

const TruckContainer = () => {
  const {userDetails} = useSelector((state: RootState) => state.auth);
  const {truckList} = useSelector((state: RootState) => state.truck);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [isFilterModalShown, setIsFilterModalShown] = useState<boolean>(false);
  const [isClear, setIsClear] = useState(false);
  const isFocus = useIsFocused();
  const style = useTruckStyle(userDetails?.profileType);
  const [truckData, setTruckData] = useState<any[]>([]);
  const {value} = useTheme();
  const [filter, setFilter] = useState({
    rc_number: '',
    owner_name: '',
    owner_number: '',
  });
  useEffect(() => {
    getTruckList(userDetails?.user_id);
    return () => {
      setIsClear(false);
    };
  }, [isFocus]);
  const onRefresh = React.useCallback(() => {
    setIsRefresh(true);
    getTruckList(userDetails?.user_id);
    sleep(2000).then(() => setIsRefresh(false));
  }, []);
  useEffect(() => {
    setTruckData([...truckList]);
  }, [truckList]);
  const searchLoad = () => {
    setIsFilterModalShown(false);
    setIsClear(true);
    let data: any = {
      rc_number: filter.rc_number,
      owner_name: filter.owner_name,
      owner_number: filter.owner_number,
    };
    data = cleanObject(data);
    var filteredData = truckList?.filter((load: any) => {
      return Object.keys(data).every((propertyName) => {
        return load[propertyName]
          ?.toLowerCase()
          ?.includes(data[propertyName]?.toLowerCase());
      });
    });
    setTruckData([...filteredData]);
  };
  const closeClear = () => {
    setIsClear(false);
    setTruckData([...truckList]);
    setFilter({
      ...filter,
      rc_number: '',
      owner_name: '',
      owner_number: '',
    });
  };
  return (
    <TruckBaseScreen
      profileType={userDetails?.profileType}
      scrollChildren={
        <React.Fragment>
          <View style={style.container}>
            <View style={style.truckAdd}>
              <AppButton
                label={'ट्रक जोड़ें'}
                buttonStyle={[style.buttonStyle]}
                onPress={() => {
                  AddTruckContainer.navigate();
                }}
                leftIcon={<AddCircleIcon color={value.color.white} />}
              />
              <View style={style.filterWrap}>
                <AppButton
                  label={strings.filter}
                  icon={
                    <FilterIcon
                      color={
                        userDetails?.profileType == 'transporter'
                          ? value.color.transporter
                          : value.color.buttonNew
                      }
                    />
                  }
                  textColor={
                    userDetails?.profileType === 'transporter'
                      ? value.color.transporter
                      : value.color.buttonNew
                  }
                  buttonStyle={style.filterButton}
                  onPress={() => setIsFilterModalShown(true)}
                />
              </View>
            </View>
            {isClear && (
              <AppTouchableOpacity
                onPress={closeClear}
                style={style.clearButton}
                children={<CloseCircleIcon size={20} />}
              />
            )}
            <FlatList
              data={truckData}
              renderItem={({item}: any) => (
                <TruckComponent
                  profileType={userDetails?.profileType}
                  userId={userDetails?.user_id}
                  data={item}
                />
              )}
              keyExtractor={(_: any, index: number) => 'key' + index}
              onRefresh={onRefresh}
              refreshing={isRefresh}
              ListEmptyComponent={
                <RenderEmpty title="कोई ट्रक नहीं है कृपा ट्रक जोड़े" />
              }
            />
          </View>
          {isFilterModalShown && (
            <TruckFilterModal
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
      }
    />
  );
};
TruckContainer.SCREEN_NAME = 'TruckContainer';
TruckContainer.navigationOptions = {
  headerShown: false,
};
TruckContainer.navigate = () => {
  RootNavigator.navigate(TruckContainer.SCREEN_NAME);
};

export default TruckContainer;
