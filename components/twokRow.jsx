import isBase64 from 'is-base64';
import {React, useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import CommunicationController from '../model/CC';
import StorageManager from '../model/storeManager';

const sid = StorageManager.getSid();


function TwokRow(props) {
    let [image, setImage] = useState(null)
    let [loaded, setLoaded] = useState(false)
    let [validPicture, setValidPicture] = useState(false)

    var twok = props.data.item
    let SM = new StorageManager();

    const fontsize = [20, 30, 40];
    const fonttype = ['System', 'monospace', 'serif'];
    const halign = ['flex-start' ,'center' ,'flex-end'];
    const valign = ['flex-start' ,'center' ,'flex-end'];

    
    useEffect(() => {SM.getUserPicture(twok.uid,
            result =>{setImage(image = JSON.stringify(result.picture))},
            error => console.log(error)
        )}, checkGoodBase64())


    const styles = StyleSheet.create({
        twokStyle: {
            width: "100%",
            height: (Dimensions.get('window').height-129),
            backgroundColor:'#'+twok.bgcol,
            
            flex: 1
        },
        textStyle: {
            fontSize: fontsize[twok.fontsize],
            fontFamily: fonttype[twok.fonttype],
            fontWeight: "700",
            color: '#'+twok.fontcol
        },
      });
    
    const handlePress = () => {
        props.handleNavigation(twok.uid)
    }

    const handlePressMap = (lat, lon) => {
        console.log(lat, lon)
        props.handleNavigationMap(twok.lat, twok.lon)
    }

    function checkGoodBase64(){
        if(image != null){
            let source = 'data:image/png;base64,' + (image);
            if(typeof(source) !== "string"){
                source = 'data:image/png;base64,' + (image);
            }

            Image.getSize(source, (width, height) => {setValidPicture(true)}, (error) => {setValidPicture(false)});
        }        
        
    }

            return (
                <View style={styles.twokStyle}>
                <View style={{
                    backgroundColor: 'grey',
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderBottomColor: 'yellow',
                    borderBottomWidth: 1
                }}>
                {image == 'null' || validPicture == false ? 
                //Se l'immagine è null
                <View>
                    <TouchableOpacity onPress={handlePress}>
                        <Image
                            source={require('../images/placeholder_No_Profile_Picture.jpeg')}
                            style={{width: 100, height:70, resizeMode: 'contain'}}
                        />
                    </TouchableOpacity>
                </View> : 
                //Se l'immagine non è null
                <View>
                    <TouchableOpacity onPress={handlePress}>
                        <Image
                            source={{uri:
                            'data:image/png;base64,' + (image)}} style={{width: 100, height:70, resizeMode: 'contain'}}
                        /> 
                    </TouchableOpacity>  
                </View>}
                    
                    <View style={{
                        flex: 2,
                        textAlign: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>
                        <Text style={{fontSize:30}}>{twok.name}</Text>
                    </View>
                    {twok.lat != null && twok.lon != null ? 
                    //Controllo per il bottone della posizione
                    <View style={{
                        flex: 1,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>
                        <Button title='Posizione' onPress={() => handlePressMap(twok.lat, twok.lon)} color = 'black'></Button>
                    </View> : ""}
                </View>
                <View style={{
                    flex: 4,
                    justifyContent: halign[twok.halign],
                    alignItems: valign[twok.valign]
                }}>
                   <Text style={styles.textStyle}>{twok.text}</Text> 
                </View>
                
                
            </View> );
}



export default TwokRow;
