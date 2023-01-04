import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import { studentProps } from '../screens/TeacherGroupStudentsScreen';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const StudentCard = (student: studentProps, navigation: any) => {
  const userAvatar = `https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}&background=0D8ABC&color=fff`;
  return (
    <Pressable
      style={styles.node}
      onPress={() => {
        navigation.navigate('Modal', { StudentId: student.studentId }); //, { navigation: navigation, route: route });
      }}
    >
      <Image
        style={{ marginLeft: 8, marginRight: 8, borderRadius: 12 }}
        source={{ uri: userAvatar, height: 42, width: 42 }}
      />
      <Text style={styles.text}>
        {student.firstName} {student.lastName} {' \n'}
        {student.email}
      </Text>
      <Pressable style={styles.group}>
        <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>
          {student.groupId}
        </Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDFDFD',
    margin: 10,
    width: width * 0.8,
    height: height * 0.1,
    borderRadius: 16,
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: 'black',
    alignItems: 'center',
  },
  group: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: '#000022',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#e8f6f0',
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
    width: 180,
  },
  node: {
    margin: 10,
    width: width * 0.8,
    height: height * 0.1,
    backgroundColor: '#FDFDFD',
    borderColor: '#000022',
    borderWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 8,
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default StudentCard;
