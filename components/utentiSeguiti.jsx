import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, ActivityIndicator, Text, View, Button, FlatList, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import FollowedLoaderHelper from '../viewModel/followedLoaderHelper';

import {React, useState, useEffect, Component, useContext} from 'react';

import StorageManager from '../model/storeManager';
import SeguitiContext from '../context';

import UtenteSeguito from './utenteSeguito';

const helper = new FollowedLoaderHelper();

function UtentiSeguiti(props){

    const [seguiti, setSeguiti] = useState(null)
    const [sid, setSid] = useState(null)
    const [isReady, setIsReady] = useState(false)
    
    const handleFollowContext = useContext(SeguitiContext)

    //console.log('stampo i followed in utenti seguiti: ', handleFollowContext.seguiti)

    useEffect(() => {handleRequest().catch(error => {console.error(error); setIsReady(false)})})

    async function handleRequest() {
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
       setSeguiti(handleFollowContext.seguiti)
       setSid(handleFollowContext.sid)
       setIsReady(true)
    }

    const handleNavigation = (uid) =>{
        props.navigation.navigate('BachechaUtente', {
          uid: uid,
          sid: sid
        })
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
        <View style={styles.container}>
            <FlatList data={seguiti}
            renderItem={(utente)=>{return <UtenteSeguito data={utente} handleNavigation={handleNavigation}/>}}
            keyExtractor={(utente)=>utente.uid} 
            />
        </View>
        
      )
    }
    
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
});

export default UtentiSeguiti;