import { View, StyleSheet } from "react-native";

const Separator = () =>{
    return(
        <View style={styles.separator} />
    )

}

const styles = StyleSheet.create({
    separator: {
        alignSelf: 'center',
        marginVertical: 30,
        height: 1,
        width: '80%',
        backgroundColor: "rgba(255,255,255,0.1)"
  },
})

export default Separator;