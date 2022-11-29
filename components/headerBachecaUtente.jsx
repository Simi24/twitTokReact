import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, FlatList, Dimensions } from 'react-native';
import {React, useState, useEffect, Component, useContext} from 'react';

import SeguitiContext from '../context';

import CommunicationController from '../model/CC';
import StorageManager from '../model/storeManager';
import TwokLoaderHelper from '../viewModel/twokLoeaderHelper';

const SM = new StorageManager();

export default function HeaderBachecaUtente(props){
    //const followed = props.followed
    let [image, setImage] = useState(null)
    let [loading, setLoading] = useState(true)
    const [name, setName] = useState(null)
    const [follow, setFollow] = useState()

    //console.log('stampo il follow', follow)

    const uid = props.uid;
    

    const handleFollowContext = useContext(SeguitiContext)

    const sid = handleFollowContext.sid

    
    useEffect(() => {handleRequest(), handleFollow2, handleUnFollow2}, [])

    async function handleRequest(){
        const followed = (await CommunicationController.isFollowed(sid, uid))

        setFollow(followed.followed)
        SM.getUserPicture(uid,
        result =>{setImage(image = (JSON.stringify(result.picture))), setName(result.name)},
        error => console.log(error)
        )
    }


    async function handleFollow2() {
        handleFollowContext.handleFollow(uid)
          setFollow(true)
    }

    async function handleUnFollow2 () {
      handleFollowContext.handleUnFollow(uid)
      setFollow(false)
    }

    //UTENTE NON SEGUITO
    if(follow == false){
        //UTENTE NON SEGUITO SENZA IMMAGINE
        if(image == 'null'){
        return(
            <View style={{
                backgroundColor: 'grey',
                width: '100%',
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between'
                }}>
                <View style={{
                    flex: 1
                }}>
                   <Image
                source={require('../images/placeholder_No_Profile_Picture.jpeg')}
                style={{width: 100, height:100, resizeMode: 'contain'}}
                /> 
                </View>    
                <View style={{
                    flex: 1,
                    textAlign: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center'
                }}>
                  <Text style={{fontSize:30}}>{name}</Text>  
                </View>
                <View style={{
                    alignItems: 'center',
                    flex: 1
                    }}>
                    <Button title='Follow' onPress={handleFollow2}></Button>
                </View>
            </View>
        )
    } else {
        //UTENTE NON SEGUITO CON L'IMMAGINE
        return(
            <View style={{
                backgroundColor: 'grey',
                width: '100%',
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between'
                }}>
                <View style={{
                    flex: 1
                }}>
                   <Image
                source={{uri:
                    'data:image/png;base64,' + (image)}} style={{width: 100, height:50, resizeMode: 'contain'}}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
            /> 
                </View>    
                <View style={{
                    flex: 1,
                    textAlign: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center'
                }}>
                  <Text style={{fontSize:30}}>{name}</Text>  
                </View>
                <View style={{
                    alignItems: 'center',
                    flex: 1
                    }}>
                    <Button title='Follow' onPress={handleFollow2}></Button>
                </View>
            </View>
        )
    }
    //UTENTE SEGUITO
    } else {
        //UTENTE SEGUITO SENZA IMMAGINE
        if(image == 'null'){
            return(
                <View style={{
                    backgroundColor: 'grey',
                    width: '100%',
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                    }}>
                    <View style={{
                        flex: 1
                    }}>
                       <Image
                    source={require('../images/placeholder_No_Profile_Picture.jpeg')}
                    style={{width: 100, height:100, resizeMode: 'contain'}}
                    /> 
                    </View>    
                    <View style={{
                        flex: 1,
                        textAlign: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>
                      <Text style={{fontSize:30}}>{name}</Text>  
                    </View>
                    <View style={{
                        alignItems: 'center',
                        flex: 1
                        }}>
                        <Button title='UnFollow' onPress={handleUnFollow2}></Button>
                    </View>
                </View>
            )
        } else {
            //UTENTE SEGUITO CON L'IMMAGINE
            return(
                <View style={{
                    backgroundColor: 'grey',
                    width: '100%',
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                    }}>
                    <View style={{
                        flex: 1
                    }}>
                       <Image
                    source={{uri:
                        'data:image/png;base64,' + (image)}} style={{width: 100, height:50, resizeMode: 'contain'}}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                /> 
                    </View>    
                    <View style={{
                        flex: 1,
                        textAlign: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>
                      <Text style={{fontSize:30}}>{name}</Text>  
                    </View>
                    <View style={{
                        alignItems: 'center',
                        flex: 1
                        }}>
                        <Button title='UnFollow' onPress={handleUnFollow2}></Button>
                    </View>
                </View>
            )
        }
    }
    
    
}