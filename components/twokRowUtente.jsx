
import {React, useState, useEffect, Component, useContext} from 'react';

import { StyleSheet, Text, View, Dimensions, Image, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import CommunicationController from '../model/CC';
import StorageManager from '../model/storeManager';

import SeguitiContext from '../context';

//TODO: controllare la posizione del testo nel twok
//TODO: visualizzare la mappa del twok


function TwokRowUtente(props) {

    const handleFollowContext = useContext(SeguitiContext)

    const sid = handleFollowContext.sid
    

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


            return(
                <View style={styles.twokStyle}>
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
