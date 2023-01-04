import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../context/config';
import { AuthContext } from '../context/authModel';
import { useNavigation } from '@react-navigation/native';

interface IStudentObject {
  studentId: number;
  groupId: number;
  firstName: string;
  lastName: string;
  email: string;
}

type GroupsProps = {
  item: number;
};

const TeacherGroupsScreen = () => {
  const [groups, setGroups] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const { userInfo } = useContext(AuthContext);
  const [students, setStudents] = useState<IStudentObject[]>([]);
  const navigation = useNavigation();
  const getGroupsStudents = async (groups: number[]) => {
    console.log('here', groups);
    groups?.map(async (value) => {
      const response = await axios.get(
        `${BASE_URL}/api/departments/${userInfo?.DepartmentId}/groups/${value}/students`,
      );
      if (response.status == 200) {
        setStudents((value) => [value, ...response.data]);
      }
    });
  };

  const getTeacherGroups = async () => {
    const response = await axios.get(
      `${BASE_URL}/api/teacher/${userInfo?.TeacherId}/groups`,
    );
    if (response.status == 200) {
      setRefresh(false);
      setGroups(response.data);
    }
  };
  // const getTeacherGroups2 = async () => {
  //   const response = await axios.get(
  //     `${BASE_URL}/api/teacher/${userInfo?.TeacherId}/groups`,
  //   );
  //   console.log('CHECK');
  //   if (response.status == 200) {
  //     setRefresh(false);
  //     setGroups(response.data);
  //   }
  // };

  useEffect(() => {
    getTeacherGroups();
    //getGroupsStudents(groups);
    return () => {
      //console.log('ComponentWillUnMount');
    };
  }, []);

  const renderItem = ({ item }: GroupsProps) => {
    return (
      <Pressable
        style={styles.item}
        onPress={() => {
          navigation.navigate('Students', { group: item });
        }}
      >
        <Text style={{ alignSelf: 'center' }}>{item}</Text>
      </Pressable>
    );
  };
  return (
    <View
      style={{ marginRight: 16, marginLeft: 16, backgroundColor: '#FDFDFD' }}
    >
      {/* {groups.map((value, index) => {
        return <Text key={index}>{value}</Text>;
      })} */}
      <FlatList
        data={groups}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => getTeacherGroups()}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FDFDFD',
    padding: 20,
    borderWidth: 4,
    borderColor: 'black',
  },
});

export default TeacherGroupsScreen;
