import React from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/reducers';
import {Center, Skeleton, VStack} from 'native-base';

const LoadingSpinner = () => {
  const loading = useSelector((state: RootState) => state.loading.loading);
  return (
    <React.Fragment>
      <Modal visible={loading}>
        <View style={styles.relative}>
          <View style={styles.skeleton}>
            <Center w="100%" h={'100%'}>
              <VStack
                w="100%"
                h={'100%'}
                maxW="400"
                borderWidth="1"
                space={8}
                rounded="md"
                _dark={{
                  borderColor: 'coolGray.600',
                }}
                _light={{
                  borderColor: 'coolGray.200',
                }}>
                <Skeleton h="40" />
                <Skeleton.Text px="4" />
                <Skeleton px="4" my="4" rounded="md" startColor="black.500" />
              </VStack>
            </Center>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};
export default LoadingSpinner;

const styles = StyleSheet.create({
  relative: {
    position: 'relative',
    flex: 1,
  },
  skeleton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    overflow: 'hidden',
  },
});
