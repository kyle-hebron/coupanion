import { StyleSheet, View, TextInput } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";

export default function IconInput(props){
    const {searchIcon, text, handleChange, secure} = props;
    return (
        <View style={styles.iconInput}>
            <Icon style={styles.searchIcon} name={props.icon} size={20} color="#888" />
            <TextInput
                placeholder={props.text}
                style={styles.input}
                secureTextEntry={secure}
                onChangeText={props.handleChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    iconInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 22,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        backgroundColor: 'white',
        width: '75%',
        height: 50,
        borderRadius: 22,
        color: 'black'
    },
})