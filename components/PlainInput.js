import { StyleSheet, View, TextInput } from 'react-native';

export default function PlainInput(props){
    const {text, handleChange, secure} = props;
    return (
        <View style={styles.iconInput}>
            <TextInput
                placeholder={props.text}
                style={styles.input}
                secureTextEntry={secure}
                onChangeText={handleChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    iconInput: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 22,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    input: {
        backgroundColor: 'white',
        width: '75%',
        height: 50,
        borderRadius: 22,
        color: 'black',
        paddingHorizontal: 10
    },
})