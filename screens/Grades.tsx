import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { RootStackScreenProps } from '../types';
import { GradeProps } from './Subjects';
import COLORS from '../constants/Colors_Screens';
import Separator from '../components/Separator';

const { width, height } = Dimensions.get('window');

const Grades = ({ route }: RootStackScreenProps<'Grades'>) => {
  const grades = route?.params;
  let color = '';

  let number = 0;
  let marks = 0;
  //const [marks, setMarks] = useState(0);
  //const [num, setNum] = useState(0);
  const [avg, setAVG] = useState(0);

  const mark = (grade: number, count: number) => {
    if (count === 0) return 0;
    if (grade === 0) return 0;
    return grade / count;
  };

  useEffect(() => {
    setAVG(mark(marks, number));
    return () => {
      avg;
    };
  }, []);

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
      <ScrollView>
        <Text style={{ fontSize: 20, alignSelf: 'center' }}>Subject-name</Text>
        {avg ? (
          <Text style={{ fontSize: 20, alignSelf: 'center' }}>
            Average grade: {avg}
          </Text>
        ) : null}
        {/* <Separator /> */}
        {grades.grade.map((value: GradeProps, key) => {
          //console.log(key + 1);
          number = key + 1;
          marks += value.grade;
          //console.log("number: ", number);
          //console.log("marks: ", marks)
          //setNum(key + 1);
          color = value.grade > 2 ? 'COLORS.lightgrey' : 'red';
          //setMarks(marks + value.grade);
          return (
            <Pressable
              key={key.toString()}
              style={styles.container}
              android_ripple={{ color: 'powderblue' }}
            >
              <View style={styles.grade}>
                <Text style={{ color: color }}>{value.date}</Text>
                <Text style={{ color: color }}>{value.description}</Text>
                <Text style={{ color: color }}>{value.grade}</Text>
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
    backgroundColor: COLORS.lightgrey,
    borderWidth: 3,
    borderColor: COLORS.grey,
    borderRadius: 10,
    elevation: 6,
    shadowOpacity: 0.8,
    shadowRadius: 15,
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
