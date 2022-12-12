import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { RootStackScreenProps } from '../types';
import axios from 'axios';
import { BASE_URL } from '../context/config';
import { AuthContext } from '../context/authModel';

const { width, height } = Dimensions.get('window');

const Grades = ({ route }: RootStackScreenProps<'Grades'>) => {
  const name = route?.params;
  const { userInfo }: any = useContext(AuthContext);
  let gradeShadow = '';

  const number = 0;
  //let marks = 0;
  //const [marks, setMarks] = useState(0);
  //const [num, setNum] = useState(0);
  const [avg, setAVG] = useState(0);
  const [marks, setMarks] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [nameGrade, setNameGrade] = useState(undefined);

  const getUserMarks = (name: string) => {
    axios
      .post(
        `${BASE_URL}/api/students/${userInfo['StudentId']}/marks/subject`,
        `${nameGrade}`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .then((response) => {
        setRefresh(false);
        setMarks(response.data);
      });
  };

  const mark = (grade: number, count: number) => {
    if (count === 0) return 0;
    if (grade === 0) return 0;
    return grade / count;
  };

  useEffect(() => {
    setNameGrade(name.grade);
    if (nameGrade) {
      getUserMarks(name);
    }
    //setAVG(mark(marks, number));
    // return () => {
    //   avg;
    // };
  }, [nameGrade]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      {/* <View style={[styles.separator, {backgroundColor: "#eee"}]} /> */}
      {refresh ? <ActivityIndicator /> : null}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              getUserMarks(name.grade);
            }}
          />
        }
      >
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>{name.grade}</Text>
        {avg ? (
          <Text style={{ fontSize: 20, alignSelf: 'center' }}>
            Average grade: {avg}
          </Text>
        ) : null}
        {/* <Separator /> */}
        {marks.map((value: any, key) => {
          //console.log(key + 1);
          //number = key + 1;
          //marks += value.grade;
          //console.log("number: ", number);
          //console.log("marks: ", marks)
          //setNum(key + 1);
          gradeShadow = value.markValue > 2 ? 'black' : 'red';
          //setMarks(marks + value.grade);
          return (
            <Pressable
              key={key.toString()}
              style={styles.container}
              android_ripple={{ color: 'powderblue' }}
            >
              <View style={styles.grade}>
                <Text style={{}}>{value.dateOfIssue}</Text>
                <Text style={{}}>{value.description}</Text>
                <Text style={{}}>{value.markValue}</Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //alignItems: 'center',
    margin: 20,

    //backgroundColor: COLORS.lightgrey,
    //backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#4D0036',
    borderRadius: 3,
    //elevation: 1,
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowColor: 'black',
    width: width * 0.8,
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    // backgroundColor: '#f4f4f4',
    // justifyContent: 'center',
    // margin: 10,
    // borderWidth: 3,
    // borderRadius: 10,
    // borderColor: 'whitesmoke',
    // shadowOpacity: 0.8,
    // elevation: 6,
    // shadowRadius: 15,
  },
  grade: {
    //margin: 1,
    //width: width * 0.80,
    //height: height * 0.10,
    //width: "100%",
    //height: "50%",
    alignItems: 'center',
  },
});

export default Grades;
