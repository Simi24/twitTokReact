import {React, useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import CommunicationController from '../model/CC';
import StorageManager from '../model/storeManager';


const SM = new StorageManager();
export default function UtenteSeguito(props) {
    let [image, setImage] = useState(null)
    let [validPicture, setValidPicture] = useState(false)

    const uid = props.data.item.uid

    //console.log('stampo utente in utenteSeguito: ', props.data.item)
    
    useEffect(() => {SM.getUserPicture(uid,
        result =>{setImage(image = (JSON.stringify(result.picture)))},
        error => console.log(error)
    )}, checkGoodBase64())

    const handlePress = () => {
        props.handleNavigation(uid)
    }

    function checkGoodBase64(){
        if(image != 'null'){
            let source = 'data:image/png;base64,' + (image);
            if(typeof(source) !== "string"){
                source = 'data:image/png;base64,' + (image);
            }

            Image.getSize(source, (width, height) => {setValidPicture(true)}, (error) => {setValidPicture(false)});
        }        
        
    }


        return (
            <View style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                paddingBottom: 5,
                paddingTop: 5
            }}>
                <View style={{
                    flex: 2
                }}>
                    <Text style={{fontSize: 20}}>{props.data.item.name}</Text>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <TouchableOpacity onPress={handlePress}>
                        {image == null || !validPicture ?
                        <Image
                            source={require('../images/placeholder_No_Profile_Picture.jpeg')}
                            style={{width: 100, height:50, resizeMode: 'contain'}}
                        />
                        :
                        <Image
                        source={{uri:
                            'data:image/png;base64,' + (image)}} style={{width: 100, height:50, resizeMode: 'contain'}}
                        />
                        }
                        
                    </TouchableOpacity>
                    
                </View>
                
            </View>
        )
    
}