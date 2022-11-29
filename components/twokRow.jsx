import {React, useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import CommunicationController from '../model/CC';
import StorageManager from '../model/storeManager';

const sid = StorageManager.getSid();

//TODO: controllare la posizione del testo nel twok
//TODO: visualizzare la mappa del twok

function TwokRow(props) {
    let [image, setImage] = useState(null)
    let [loaded, setLoaded] = useState(false)
    var twok = props.data.item
    let SM = new StorageManager();

    const fontsize = [20, 30, 40];
    const fonttype = ['System', 'monospace', 'serif'];
    const halign = ['flex-start' ,'center' ,'flex-end'];
    const valign = ['flex-start' ,'center' ,'flex-end'];

    
    useEffect(() => {SM.getUserPicture(twok.uid,
            result =>{setImage(image = JSON.stringify(result.picture))},
            error => console.log(error)
        )})

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
        alert('premuto')
        props.handleNavigationMap(twok.lat, twok.lon)
    }

    if(twok.lat == null || twok.lon == null){
        if((image == 'null')){
            return(
                <View style={styles.twokStyle}>
            <View style={{
                backgroundColor: 'grey',
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <View>
                    <TouchableOpacity onPress={handlePress}>
                <Image
                source={require('../images/placeholder_No_Profile_Picture.jpeg')}
                style={{width: 100, height:100, resizeMode: 'contain'}}
                />
            </TouchableOpacity>
                </View>
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
            </View>
            <View style={{
                    flex: 4,
                    justifyContent: halign[twok.halign],
                    alignItems: valign[twok.valign]
                }}>
               <Text style={styles.textStyle}>{twok.text}</Text> 
            </View>
            
            
        </View>
            )
        } else {
            return (
                <View style={styles.twokStyle}>
                <View style={{
                    backgroundColor: 'grey',
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <View>
                      <TouchableOpacity onPress={handlePress}>
               <Image
                    source={{uri:
                        'data:image/png;base64,' + (image)}} style={{width: 100, height:50, resizeMode: 'contain'}}
                /> 
            </TouchableOpacity>  
                    </View>
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
    } else {
        if((image == 'null')){
            return(
                <View style={styles.twokStyle}>
            <View style={{
                backgroundColor: 'grey',
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row'
                }}>
                <View>
                    <TouchableOpacity onPress={handlePress}>
                <Image
                source={require('../images/placeholder_No_Profile_Picture.jpeg')}
                style={{width: 100, height:100, resizeMode: 'contain'}}
                />
                    </TouchableOpacity>
                </View>
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
                <View style={{
                        flex: 1,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center'
                        }}>
                    <Button title='Posizione' onPress={() => handlePressMap(twok.lat, twok.lon)}></Button>
                </View>
            </View>
            <View style={{
                    flex: 4,
                    justifyContent: halign[twok.halign],
                    alignItems: valign[twok.valign]
                }}>
               <Text style={styles.textStyle}>{twok.text}</Text> 
            </View>
            
            
        </View>
            )
        } else {
            return (
                <View style={styles.twokStyle}>
                <View style={{
                    backgroundColor: 'grey',
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <View>
                      <TouchableOpacity onPress={handlePress}>
               <Image
                    source={{uri:
                        'data:image/png;base64,' + (image)}} style={{width: 100, height:50, resizeMode: 'contain'}}
                /> 
            </TouchableOpacity>  
                    </View>
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
                    <View style={{
                        flex: 1,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center'
                  }}>
                      <Button title='Posizione' onPress={() => handlePressMap(twok.lat, twok.lon)}></Button>
                  </View>
                   
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
    }

}



export default TwokRow;
