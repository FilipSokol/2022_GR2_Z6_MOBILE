import React from "react";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";


const Login = () => {

    return (
        <View style={styles.container}>
            <TextInput placeholder="Login" style={styles.textInput} />
            <TextInput placeholder="Password" style={styles.textInput} autoCorrect={false} secureTextEntry />
            <View style={{width: 200, marginTop: 10}}>
                <Button title={"Login"}/>
            </View>
        </View>
    )   
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        width: "80%",
    },
    textInput: {
        margin: 10,
        borderWidth: 1,
        borderColor: '#e1e1e1',
        width: 200,
        fontSize: 15,
        textAlign: 'center',
        backgroundColor: '#ffffff',
    }
})

export default Login;
