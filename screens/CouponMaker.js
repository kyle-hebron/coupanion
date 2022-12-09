import { faBold, faRotate, faWheatAwnCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Button, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const CouponMaker = ({navigation}) => {

        const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

        const showDatePicker = () => {
            setDatePickerVisibility(true);
        };

        const hideDatePicker = () => {
            setDatePickerVisibility(false);
        };

        const handleConfirm = (date) => {
            console.warn("A date has been picked: ", date);
            hideDatePicker();
        };

  return (
    
    <KeyboardAvoidingView  style={styles.container} >
        <KeyboardAwareScrollView>
        <KeyboardAvoidingView style={styles.secondContainer} >
            <Icon style={styles.fakeCoupon} name="ticket-alt" size={150} color="white" />
            <Icon style={styles.barCode} name="qrcode" size={60} color="white" />
            <TextInput placeholder="discount" style={styles.input}/> 
            <Icon style={styles.percent} name="percent" size={20} color="lightgrey" />
            <TextInput placeholder="code" style={styles.code}/>
            <TextInput placeholder="title" style={styles.title}/>
            {/*<Button style={styles.date} title="Show Date Picker" onPress={showDatePicker} />*/}
            <TouchableOpacity style={styles.date} onPress={showDatePicker}
            >
                <Text styles ={styles.dateText}>Expiration</Text>
                <Icon style={styles.calendar} name="calendar-week" size={17} color="lightgray" />

            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                maximumDate={new Date(20301229)}
                minimumDate={new Date(19500101)}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <TouchableOpacity
                onPress={() => { }}
                style={styles.button}
            >
                <Text styles ={styles.buttonText}>Create</Text>

            </TouchableOpacity>
        </KeyboardAvoidingView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>

)
}

export default CouponMaker

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#102C54',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },

    secondContainer: {
        backgroundColor: '#102C54',
        width: 355,
        height: 750,
        borderColor: 'white',
        borderWidth: 5,
        top: 60,
       
    },

    input: {
        backgroundColor: 'white',
        paddingHorizontal: 80,
        paddingVertical: 15,
        borderRadius: 100,
        width: 220,
        left: 70,
        marginTop: 120,
    },

    percent: {
        bottom: 33,
        left: 90,
    },

    code: {
        backgroundColor: 'white',
        paddingHorizontal: 90,
        paddingVertical: 15,
        borderRadius: 100,
        width: 220,
        left: 70,
    },

    title: {
        backgroundColor: 'white',
        paddingHorizontal: 95,
        paddingVertical: 15,
        borderRadius: 100,
        width: 220,
        left: 70,
        top: 20,
    },

    button: {
        borderRadius: 100,
        paddingHorizontal: 95,
        paddingVertical: 20,
        width: 240,
        backgroundColor: 'lightblue',
        left: 60,
        top: 110,
        
    },


    calendar: {
        right: 55,
        bottom: 18,
    },

    date: {
        borderRadius: 100,
        paddingTop: 20,
        paddingHorizontal: 75,
        paddingVertical: 0,
        
        width: 220,
        backgroundColor: 'white',
        left: 70,
        top: 40,
    },



    barCode: {
        top: 90,
        left: 145,
    },

    fakeCoupon: {
        top: 140,
        justifyContent: 'center',
        //right: 130,
        transform: [{ rotate: '90deg' }],
    }


})