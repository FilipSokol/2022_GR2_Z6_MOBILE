import { View, Text, TouchableWithoutFeedback } from "react-native"
import { RootHomeStackScreenProps } from "../types";


const DontHaveAccount = ({navigation}: RootHomeStackScreenProps<"Login">) => {

    return (
        <View>
            <Text> Don't have an{" "}
                <Text
                    onPress={()=>{navigation.navigate('Register')}}
                    //onPressIn={()=>{}}
                    //onPressOut={()=>{}}
                    style={{fontWeight: 'bold' }}
                >
                    account
                </Text>?
            </Text>
        </View>
    )
}

export default DontHaveAccount;