import React, { Component, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView, Button, GradientTextButton } from 'react-native';
import {Linking} from 'react-native'


//import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';

export default function BusinessPage({navigation}) {

    let count = 90;

    return (
       
        <SafeAreaView style={styles.container}>
             <ScrollView>
             <Text style={{fontSize: 69, textAlign: 'left', margin: 10,fontWeight: 'bold', color: 'white', paddingLeft: 25}}>Profile</Text>
             <View style={styles.balloon}>
            <Image 
                source={require('../assets/wendy.png')}  
                style={styles.logo} 
            />
                <View style={{paddingHorizontal: 15, paddingTop: 20}}>
                    <Text style={{alignItems: 'left', fontSize: 25, color: 'white', fontWeight: 'bold'}}>Wendys</Text>
                    <Text style={styles.name}>18111 Nordhoff St, Northridge, CA 91330 </Text>
                    <Text onPress={()=>{Linking.openURL('tel:(818) 677-1200');}} style={styles.name}>(818) 677-1200</Text>
                </View>
            </View>


                <Text style={styles.titles}>Active Coupons</Text>

            <View style={styles.balloon}>             
                <View style={styles.couponPack}>
                    <Text style={{fontSize: 75}}>This is a placeholder</Text>
                </View>
            </View>

            <TouchableOpacity style={{paddingBottom: 15, flexDirection: 'row-reverse', }} 
                onPress={() => {
                    alert('No coupons available')
                }}> 
                <Text style={{fontSize: 15, color: 'white', paddingHorizontal: 25}}>View all</Text>
            </TouchableOpacity>
            

            <View style={{flexDirection: 'column'}}>
            <Text style={styles.titles}>Hours:</Text>
                <View style={styles.openingTimes}>
                    <Text style={styles.time}>Sunday        </Text>
                    <Text>          </Text>
                    <Text style={styles.time}>6:30AM - 12:00AM</Text>
                </View>
                <View style={styles.openingTimes}>
                    <Text style={styles.time}>Monday       </Text>
                    <Text>          </Text>
                    <Text style={styles.time}>6:30AM - 12:00AM</Text>
                </View>
                <View style={styles.openingTimes}>
                    <Text style={styles.time}>Tuesday      </Text>
                    <Text>          </Text>
                    <Text style={styles.time}>6:30AM - 12:00AM</Text>
                </View>
                <View style={styles.openingTimes}>
                    <Text style={styles.time}>Wednesday</Text>
                    <Text>          </Text>
                    <Text style={styles.time}>6:30AM - 12:00AM</Text>
                </View>
                <View style={styles.openingTimes}>
                    <Text style={styles.time}>Thursday    </Text>
                    <Text>          </Text>
                    <Text style={styles.time}>6:30AM - 12:00AM</Text>
                </View>
                <View style={styles.openingTimes}>
                    <Text style={styles.time}>Friday         </Text>
                    <Text>          </Text>
                    <Text style={styles.time}>6:30AM - 12:00AM</Text>
                </View>
                <View style={styles.openingTimes}>
                    <Text style={styles.time}>Sunday       </Text>
                    <Text>          </Text>
                    <Text style={styles.time}>6:30AM - 12:00AM</Text>
                </View>
            </View>

            <View style={{flexDirection: 'row', paddingTop: 75}}>
                <View style={styles.balloonWhite}>
                    <TouchableOpacity style={styles.buttonGroup}
                    onPress={() => {
                        alert('Menu not yet available')
                    }}>
                        <Text style={{fontSize: 50, textAlign: 'auto', color: '#102C54',fontWeight: 'bold'}}>Menu</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.balloonWhite}>
                    <TouchableOpacity style={styles.buttonGroup}
                    onPress={() => {
                        alert('No photos available')
                    }}>
                        <Text style={{fontSize: 50, textAlign: 'auto', color: '#102C54', fontWeight: 'bold'}}>Photos</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={{paddingTop: 75}}>
                <Text style={styles.titles}>Reviews</Text>
                <View style={styles.balloonBackground}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.reviewName}>Kristen</Text>
                        <Text style={styles.reviewName}> - </Text>
                        <Text style={styles.reviewName}>2 weeks ago</Text>
                    </View>
                    <Text style={styles.reviewText}>I wish I could give it zero stars. The front register girl was probably brand new but she spoke at a whisper even after asking her 3 times to repeat herself. We showed patience and grace, even after being told they had no lettuce and finding their drink machine was out of almost every drink and the poor young gentleman behind the counter had to assist with my drink because the girl from before just didn't understand that the drinks were all out. We went to use the women's restroom before we left but the smell of sewer made us nearly vomit. We got out to the car only to discover my mothers burger was made wrong(literally had meat and a tomatoe since they were out of lettuce). I am extremely upset with this whole experience. The young guy behind the counter is the only person I can give props to. After we returned to get the burger exchanged, he was the one I saw servicing the drink machine. He was the one that spoke up and helped us. Everyone else seemed clueless or just wanted to stand behind the counter and watch what was happening. </Text>
                    
                </View>
            </View>

            <View style={{paddingTop: 25}}>
                <View style={styles.balloonBackground}>
                <View style={{flexDirection: 'row'}}>
                        <Text style={styles.reviewName}>Brian Riggers</Text>
                        <Text style={styles.reviewName}> - </Text>
                        <Text style={styles.reviewName}>2 years ago</Text>
                    </View>
                    <Text style={styles.reviewText}>Was standing in the lobby At 9:15 a.m.15 minutes prior to official opening of doors. Could not take my order for some reason. But tells me I can go through the drive-through.Apparently it was a more of a hassle for them to take my order in the lobby Then it would for me to get back in my Big a** truck and try to squeeze it through the drive-through. Took my business somewhere else. Its mazing how we provide business to places but the employees don't wanna take that little extra Effort  And still wanna get paid $15 an hour. </Text>
                </View>
            </View>

            <TouchableOpacity style={{paddingTop: 10, flexDirection: 'row-reverse', }} 
                onPress={() => {
                    alert('No other reviews')
                }}> 
                <Text style={{fontSize: 15, color: 'white', paddingHorizontal: 25}}>View all</Text>
            </TouchableOpacity>


            </ScrollView>
        </SafeAreaView>
       
    )



}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#102C54',
        justifyContent: 'center',
        flex: 1
    },

    logo: {
        
        alignItems: 'left',
        width: 100,
        height: 100,
        borderRadius: 200/2
    },

    name: {
        alignItems: 'left',
        fontSize: 20,
        color: 'white',
    },

    balloon: {
        paddingHorizontal: 35,
        paddingTop: 10,
        paddingBottom: 15,
        borderRadius: 20,
        flexDirection: 'row',
        
    },

    couponPack: {
        paddingHorizontal: 35,
        paddingTop: 10,
        paddingBottom: 15,
        borderRadius: 20,
        flexDirection: 'row',
        alignContent: 'center',
        
        
    },

    buttonGroup: {
        
        alignItems: 'center',
        width: '100%',
        height: 45,
        
        backgroundColor: '#ffffff'

    },

    balloonWhite: {
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 15,
        borderRadius: 20,
        flexDirection: 'row',
        width: '50%',
       
    },

    balloonBackground: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 15,
        borderRadius: 20,
        backgroundColor: 'white'
    },

    time: {
        fontSize: 20, 
        textAlign: 'auto', 
        color: '#ffffff',
    },

    titles: {
        alignItems: 'left', 
        fontSize: 45, 
        color: 'white', 
        fontWeight: 'bold',
        paddingLeft: 15
    },

    openingTimes: {
        flexDirection: 'row',
        paddingLeft: 45
    },

    reviewText: {
        fontSize: 20, 
        textAlign: 'auto', 
        color: '#102C54',
    },

    reviewName: {
        fontSize: 25, 
        fontWeight: 'bold',
        textAlign: 'auto', 
        color: '#102C54',
        flexDirection: 'row'
    }
    
  });

  