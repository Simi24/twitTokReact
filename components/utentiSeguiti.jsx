import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

import FollowedLoaderHelper from '../viewModel/followedLoaderHelper';

import {React, useState, useEffect, Component, useContext} from 'react';

import StorageManager from '../model/storeManager';
import SeguitiContext from '../context';

import UtenteSeguito from './utenteSeguito';

const helper = new FollowedLoaderHelper();

function UtentiSeguiti(props){

    const [seguiti, setSeguiti] = useState(null)
    const [sid, setSid] = useState(null)
    
    const handleFollowContext = useContext(SeguitiContext)

    //console.log('stampo i followed in utenti seguiti: ', handleFollowContext.seguiti)

    useEffect(() => {handleRequest()})

    function handleRequest() {
       setSeguiti(handleFollowContext.seguiti)
       setSid(handleFollowContext.sid)
    }

    const handleNavigation = (uid) =>{
        props.navigation.navigate('BachechaUtente', {
          uid: uid
        })
      }
    
      
    return(
        <View>
            <FlatList data={seguiti}
            renderItem={(utente)=>{return <UtenteSeguito data={utente} handleNavigation={handleNavigation}/>}}
            keyExtractor={(utente)=>utente.uid} 
            />
        </View>
        
    )
}

export default UtentiSeguiti;