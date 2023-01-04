import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import React, { memo } from 'react';
import { useNavigation } from '@react-navigation/native';

const HorizontalCard = ({ props }: any) => {
  const { text, nav, LeftIcon, RightIcon } = props;
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <Pressable
      style={[styles.container, { width: width * 0.8, height: height * 0.1 }]}
      onPressOut={() => {
        //navigation.navigate('Modal'); Grades
        navigation.navigate(nav);
      }}
    >
      <LeftIcon style={{ marginRight: 12, alignSelf: 'center' }} />
      <Text style={styles.text}>{text}</Text>
      <RightIcon style={{ marginLeft: 8, alignSelf: 'center' }} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDFDFD',
    borderColor: '#000022',
    borderWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 8,
    borderStyle: 'solid',
    //alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
    width: 180,
  },
});

export default memo(HorizontalCard);
