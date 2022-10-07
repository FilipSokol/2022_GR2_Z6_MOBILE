import React from "react"
import { StyleSheet, View, Text, Pressable, TouchableWithoutFeedback } from "react-native"
import { MonoText } from "../components/StyledText"

const DontHaveAccount = () => {

    return (
        <View>

            <Text> Don't have an 
                <TouchableWithoutFeedback
                    onPress={()=>{}}
                    onPressIn={()=>{}}
                    onPressOut={()=>{}}
                >
                    <Text style={{fontWeight: 'bold' }} >{" account"} </Text>
                </TouchableWithoutFeedback>?
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
})

export default DontHaveAccount;