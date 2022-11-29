import {React, useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import CommunicationController from '../model/CC';
import StorageManager from '../model/storeManager';

const sid = StorageManager.getSid();
const SM = new StorageManager();
export default function UtenteSeguito(props) {
    let [image, setImage] = useState(null)
    const uid = props.data.item.uid

    //console.log('stampo utente in utenteSeguito: ', props.data.item)
    
    useEffect(() => {SM.getUserPicture(uid,
        result =>{setImage(image = (JSON.stringify(result.picture)))},
        error => console.log(error)
    )})

    const handlePress = () => {
        props.handleNavigation(uid)
    }

    
    if(image == 'null'){
        return (
            <View style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center'
            }}>
                <View style={{
                    flex: 2
                }}>
                    <Text>{uid} {props.data.item.name}</Text>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <TouchableOpacity onPress={handlePress}>
                        <Image
                            source={require('../images/placeholder_No_Profile_Picture.jpeg')}
                            style={{width: 100, height:100, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>
                    
                </View>
                
            </View>
        )
    } else {
        return (
            <View style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center'
            }}>
                <View style={{
                    flex: 2
                }}>
                    <Text>{uid} {props.data.item.name}</Text>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <TouchableOpacity onPress={handlePress}>
                        <Image
                        source={{uri:
                            'data:image/png;base64,' + (image)}} style={{width: 100, height:50, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>
                    
                </View>
                
            </View>
        )
    }
    
}