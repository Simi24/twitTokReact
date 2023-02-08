import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, Image, View, Alert, ActivityIndicator } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {React, useState, useEffect, Component, useContext} from 'react';

import CommunicationController from '../model/CC';

import SeguitiContext from '../context';

//TODO: si lamenta perchè dovrei usare navigation.setOption per passare la funzione handleModificaProfilo
//Non-serializable values were found in the navigation state

function AreaPersonale({navigation}){
    const[name, setName] = useState(null)
    const[picture, setPicture] = useState(null)
    const[isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [isReady, setIsReady] = useState(false)

    const SidContext = useContext(SeguitiContext)
    const sid = SidContext.sid
    
    useEffect(() => {{handleRequest().catch(e => console.error(e)), setIsReady(false)}}, [])

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
        const profile = await CommunicationController.getProfile(sid)
        setName(profile.name);
        setPicture(profile.picture);
        setIsReady(true)
    }

    async function handleModificaProfilo(name, picture){
        setIsButtonDisabled(true)
        console.log('funzione modifica profilo chiamata')
        console.log('nome e figura modificatiii: ', name, picture)
        await CommunicationController.setProfile(sid, name, picture).catch(e => console.log(e));
        setName(name);
        setPicture(picture)
        setIsButtonDisabled(false)
    }

    if(!isReady){
        return(
            <SafeAreaView style={styles.container}>
              <ActivityIndicator
                size={'large'}
              />
            </SafeAreaView>
          )
    } else {
        return(
        <SafeAreaView style={styles.container}>
            {picture == null ? 
            //IMMAGINE
            <View style={{
                    alignContent: 'center'
                }}>
                 <Image
                     source={require('../images/placeholder_No_Profile_Picture.jpeg')}
                     style={{width: 200, height:200, resizeMode: 'contain'}}
                     />
                </View>
            :
            <View style={{
                flex: 1
            }}>
            <Image
                source={{uri:
                    'data:image/png;base64,' + (picture)}} style={{width: 200, height:200, resizeMode: 'contain'}}
            />
            </View>
            }
            {name == 'unnamed' ?
                <Text style={{fontSize:20}}>Non hai ancora settato un nome utente</Text>
            :
                <View style={{
                    flex: 1
                }}>
                    <Text style={{fontSize:40}}>{name}</Text>
                </View>
            }
            
            <View style={{
                flex: 1
            }}>
                <Button title='Modifica Profilo' disabled={isButtonDisabled} color = 'black' onPress={() => navigation.navigate('ModificaProfilo', {name: name, picture: picture, handleModificaProfilo: handleModificaProfilo})}/>
            </View>
            
        </SafeAreaView>
        )
    }

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 30
    }
})

export default AreaPersonale;