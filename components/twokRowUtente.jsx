
import {React, useState, useEffect, Component, useContext} from 'react';

import { StyleSheet, Text, View, Dimensions, Image, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import CommunicationController from '../model/CC';
import StorageManager from '../model/storeManager';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SeguitiContext from '../context';


function TwokRowUtente(props) {

    const handleFollowContext = useContext(SeguitiContext)

    const sid = handleFollowContext.sid

    console.log(useNavigation()) ;

    var twok = props.data.item

    let SM = new StorageManager();
    const fontsize = [20, 30, 40];
    const fonttype = ['System', 'monospace', 'serif'];
    const halign = ['flex-start' ,'center' ,'flex-end'];
    const valign = ['flex-start' ,'center' ,'flex-end'];

    const styles = StyleSheet.create({
        twokStyle: {
            width: "100%",
            height: Dimensions.get('window').height,
            paddingBottom: 258,
            backgroundColor:'#'+twok.bgcol,
            flex: 1
        },
        textStyle: {
            fontSize: fontsize[twok.fontsize],
            fontFamily: fonttype[twok.fonttype],
            fontWeight: "700",
            color: '#'+twok.fontcol,
        },
      });

      const handlePressMap = (lat, lon) => {
        console.log(lat, lon)
        props.handleNavigationMap(twok.lat, twok.lon)
    }

            return(
                <View style={styles.twokStyle}>
                    <View style={{
                        flex: 1,
                        alignSelf: 'flex-end',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center'
                        }}>
                </View>
                
                {twok.lat != null && twok.lon != null  ?
                <View style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        }}>
                    <Button title='Posizione' onPress={() => handlePressMap(twok.lat, twok.lon)} color = 'black'></Button> 
                </View>
                : ""
                }
                    <View style={{
                            flex: 4,
                            justifyContent: halign[twok.halign],
                            alignItems: valign[twok.valign]
                    }}>
                        <Text style={styles.textStyle}>{twok.text}</Text> 
                    </View>
                </View>
            )


}





export default TwokRowUtente;
