import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, FlatList, Dimensions, Alert } from 'react-native';
import {React, useState, useEffect, Component, useContext} from 'react';
import NetInfo from '@react-native-community/netinfo';
import SeguitiContext from '../context';

import CommunicationController from '../model/CC';
import StorageManager from '../model/storeManager';
import TwokLoaderHelper from '../viewModel/twokLoeaderHelper';

const SM = new StorageManager();

export default function HeaderBachecaUtente(props){
    //const followed = props.followed
    let [image, setImage] = useState(null)
    let [loading, setLoading] = useState(true)
    let [validPicture, setValidPicture] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    const [name, setName] = useState(null)
    const [follow, setFollow] = useState()


    const uid = props.uid;
    

    const handleFollowContext = useContext(SeguitiContext)

    const sid = handleFollowContext.sid

    useEffect(() => {handleRequest().catch(error => console.error(error)), handleFollow2, handleUnFollow2},checkGoodBase64() , [])

    async function handleRequest(){

        const state = await NetInfo.fetch();
        console.log(state.isConnected)
        if(!state.isConnected){
          Alert.alert(
            'Problemi di rete',
            'Verifica la connessione e riprova',
            [{text: 'OK', onPress: () => {handleRequest()}}],
            {cancelable: false},
          );
        }

        const followed = (await CommunicationController.isFollowed(sid, uid))

        setFollow(followed.followed)
        setIsButtonDisabled(false);

        SM.getUserPicture(uid,
        result =>{setImage(image = (JSON.stringify(result.picture))), setName(result.name)},
        error => console.log(error)
        )
        
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


    async function handleFollow2() {
        setIsButtonDisabled(true)
        await handleFollowContext.handleFollow(uid)
        setFollow(true)
        setIsButtonDisabled(false)
    }

    async function handleUnFollow2 () {
        setIsButtonDisabled(true)
      await handleFollowContext.handleUnFollow(uid)
      setFollow(false)
      setIsButtonDisabled(false)
    }

            return(
                <View style={{
                    backgroundColor: 'grey',
                    width: '100%',
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                    }}>
                    {image == null || validPicture == false? 
                    //IMMAGINE NULL O NON VALID
                    <View style={{
                        flex: 1
                    }}>
                       <Image
                    source={require('../images/placeholder_No_Profile_Picture.jpeg')}
                    style={{width: 100, height:70, resizeMode: 'contain'}}
                    /> 
                    </View> :
                    //IMMAGINE VALIDA
                    <View style={{
                        flex: 1
                    }}>
                    <Image
                    source={{uri:
                        'data:image/png;base64,' + (image)}} style={{width: 100, height:70, resizeMode: 'contain'}}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                    /> 
                    </View>    
                    }
                       
                    <View style={{
                        flex: 1,
                        textAlign: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>
                      <Text style={{fontSize:24}}>{name}</Text>  
                    </View>
                    {follow ?
                    //UTENTE SEGUITO
                    <View style={{
                        alignItems: 'center',
                        flex: 1
                        }}>
                        <Button title='UnFollow' onPress={handleUnFollow2} disabled={isButtonDisabled} color = 'black'></Button>
                    </View>
                    :
                    //UTENTE NON SEGUITO
                    <View style={{
                        alignItems: 'center',
                        flex: 1
                        }}>
                        <Button title='Follow' onPress={handleFollow2} disabled={isButtonDisabled} color = 'black'></Button>
                    </View>
                    }
                    
                </View>
            )    
    
}