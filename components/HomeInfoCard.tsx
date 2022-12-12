import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

const HomeInfoCard = ({ props }: any) => {
  const { width, height } = useWindowDimensions();
  const { name, role } = props;
  return (
    <View
      style={[styles.container, { width: width * 0.8, height: height * 0.12 }]}
    >
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{role}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f6f0',
    borderColor: '#000022',
    borderWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 8,
    borderStyle: 'solid',
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
  },
});

export default HomeInfoCard;
