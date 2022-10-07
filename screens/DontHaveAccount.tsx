import { View, Text, TouchableWithoutFeedback } from "react-native"


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

export default DontHaveAccount;