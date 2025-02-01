// src/components/SwipeableTab.tsx
import {AppText} from '@/components/AppText';
import {useTheme} from '@/hooks/useTheme';
import {RootState} from '@/redux/AppStore';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const SwipeableTab = ({
  tabs,
  initialTab,
  renderTabContent,
}: {
  tabs: string[];
  initialTab: number;
  renderTabContent: (activeTab: any) => any;
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const onGestureEvent = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const offsetX = event.nativeEvent.translationX;
      const newActiveTab = offsetX > 0 ? activeTab - 1 : activeTab + 1;

      if (newActiveTab >= 0 && newActiveTab < tabs.length) {
        setActiveTab(newActiveTab);
      }
    }
  };
  const {
    value,
    style: {layout},
  } = useTheme();
  const {userDetails} = useSelector((state: RootState) => state.auth);
  return (
    <View style={useStyle().tabSection}>
      <View style={useStyle().tabInner}>
        <View style={useStyle().line} />
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveTab(index)}
            style={[
              useStyle().tab,
              {
                borderBottomWidth: activeTab === index ? 4 : 0,
                borderBottomColor:
                  activeTab === index
                    ? userDetails?.profileType === 'transporter'
                      ? value.color.transporter
                      : value.color.buttonNew
                    : value.color.uploadText,
              },
            ]}>
            <AppText
              style={[
                layout.textAlignCenter,
                {
                  color:
                    activeTab === index
                      ? userDetails?.profileType === 'transporter'
                        ? value.color.transporter
                        : value.color.buttonNew
                      : value.color.uploadText,
                },
              ]}
              mode="contact">
              {tab}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <View style={{flex: 1}}>{renderTabContent(activeTab)}</View>
      </PanGestureHandler>
    </View>
  );
};

export default SwipeableTab;
function useStyle() {
  const {
    value,
    style: {layout, gutter},
  } = useTheme();
  return StyleSheet.create({
    tab: {
      ...layout.fill,
      ...gutter.padding.small,
      maxWidth: 112,
    },
    tabSection: {
      borderTopWidth: 0.2,
      ...gutter.marginTop.regular,
      borderTopColor: value.color.uploadText,
    },
    tabInner: {
      ...layout.rowVerticalCenter,
      ...gutter.gap.small,
      position: 'relative',
    },
    line: {
      height: 0.2,
      ...layout.fullWidth,
      position: 'absolute',
      bottom: 2,
      left: 0,
      right: 0,
      backgroundColor: value.color.uploadText,
    },
  });
}
