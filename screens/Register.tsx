import React from "react";
import { Button, Pressable, StyleSheet, TextInput, TouchableWithoutFeedback } from "react-native";
import { View, Text } from "../components/Themed";
import { RootHomeStackScreenProps } from "../types";


const Register = ({navigation, route}: RootHomeStackScreenProps<"Register">) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <TextInput placeholder="Login" style={styles.textInput} />
            <TextInput placeholder="Password" style={styles.textInput} autoCorrect={false} secureTextEntry />
            <View style={{width: 200, marginTop: 10}}>
                <Button title={"Register"}/>
            </View>
            <Text>
                Navigate to{" "}
                <Text 
                    onPress={()=>{navigation.navigate("Login")}}
                    style={{fontWeight: "bold"}}
                >
                    login{" "}
                </Text>
                page
            </Text>
        </View>
    )   
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        width: "100%",
    },
    textInput: {
        margin: 10,
        borderWidth: 1,
        borderColor: '#e1e1e1',
        width: 200,
        fontSize: 15,
        textAlign: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})

export default Register;
