import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react";
import { RootStackScreenProps } from "../types";
import { GradeProps } from "./Subjects";

const {width, height} = Dimensions.get("window")


const Grades = ({ route }: RootStackScreenProps<"Grades">) => {
    const grades = route?.params;
    let color = ""


    let number = 0;
    let marks = 0;
    //const [marks, setMarks] = useState(0);
    //const [num, setNum] = useState(0);
    const [avg, setAVG] = useState(0);

    const mark = (grade: number, count: number) => {
        if (count === 0)  return 0;
        if (grade === 0) return 0;
        return grade/count;
    }

    useEffect(()=>{
        setAVG(mark(marks, number))
        return ()=>{
            avg;
        }
    }, []);


    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {/* <View style={[styles.separator, {backgroundColor: "#eee"}]} /> */}
            <ScrollView>
                <Text style={{fontSize: 20, alignSelf: 'center'}}>Subject-name</Text>
                {avg? <Text style={{fontSize: 20, alignSelf: 'center'}}>Average grade: {avg}</Text> : null}
                {grades.grade.map((value: GradeProps, key) => {
                    //console.log(key + 1);
                    number = key + 1;
                    marks += value.grade;
                    //console.log("number: ", number);
                    //console.log("marks: ", marks)
                    //setNum(key + 1);
                    color = (value.grade > 2 ? "green": "red")
                    //setMarks(marks + value.grade);
                    return (
                        <Pressable key={key.toString()} style={styles.container}>
                            <View style={styles.grade}>
                                <Text style={{color: color}}>{value.date}</Text>
                                <Text style={{color: color}}>{value.description}</Text>
                                <Text style={{color: color}}>{value.grade}</Text>
                            </View>
                        </Pressable>
                    )
                })}
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        //alignItems: 'center',
        margin: 20,
        backgroundColor: '#e9eaee',
        borderWidth: 3,
        borderColor: 'whitesmoke',
        borderRadius: 10,
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        width: width * 0.80,
        height: height * 0.10,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    grade: {
        //margin: 1,
        //width: width * 0.80,
        //height: height * 0.10,
        //width: "100%",
        //height: "50%",
        alignItems: 'center'
        
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    
})


export default Grades;