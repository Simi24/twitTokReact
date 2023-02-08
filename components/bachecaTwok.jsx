import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, Dimensions, Alert, ActivityIndicator } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {React, useState, useEffect, useContext} from 'react';

import TwokRow from './twokRow';

import TwokLoaderHelper from '../viewModel/twokLoeaderHelper';

import StorageManager from '../model/storeManager';

import SeguitiContext from '../context';

const helper = new TwokLoaderHelper()

function BachecaTwok({navigation}){
  
    let[list, setList] = useState(null);
    const[sid, setSid] = useState(null);
    const [isReady, setIsReady] = useState(false)

    const SidContext = useContext(SeguitiContext)

    useEffect(() => {handleRequest()}, []);

    async function handleRequest(){
      
      const sid = SidContext.sid
      setSid(sid)
      setList(await helper.createList(sid))
      setIsReady(true)
    }


    async function handleAddTwok() {
      const state = await NetInfo.fetch();
      console.log(state.isConnected)
      if(!state.isConnected){
        Alert.alert(
          'Problemi di rete',
          'Verifica la connessione e riprova',
          [{text: 'OK', onPress: () => {handleAddTwok()}}],
          {cancelable: false},
        );
      }
      try {
        await helper.addTwok(sid, list)
        console.log('twok aggiunti')
      } catch (error) {
        Alert.alert(
          'Problemi di rete',
          'Verifica la connessione e riprova',
          [{text: 'OK', onPress: () => {handleAddTwok()}}],
          {cancelable: false},
        );
      }
        
    }

    handleScroll = () => {
      handleAddTwok().catch(error => console.error(error))
    }

    
    const handleNavigation = (uid) =>{
      navigation.navigate('BachechaUtente', {
        uid: uid,
        sid: sid
      })
    }

    const handleNavigationMap = (lat, lon) =>{
      navigation.navigate('TwokMap', {
        lat: lat,
        lon: lon
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

    return (
        <SafeAreaView style={styles.container}>
          <FlatList style={styles.listStyle} data={list}
            renderItem={(twok)=>{return <TwokRow data={twok} handleNavigation={handleNavigation} handleNavigationMap={handleNavigationMap}/>}}
            keyExtractor={(twok, index) => index.toString()} 
            snapToInterval={(Dimensions.get('window').height-129)}
            snapToAlignment="start"
            decelerationRate="fast"
            onEndReached={handleScroll}
            //Mi fa la richiesta quando mancano 3 elementi da mostrare
            onEndReachedThreshold={3}
            //onScrollEndDrag={()=>{handleScroll()}}

            />
          <StatusBar style="auto" />

        </SafeAreaView>
      );
    }

}

export default BachecaTwok;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    listStyle: {
      width: "100%"
    }
  });

//<Button title='Go to bacheca utente' onPress={() => navigation.navigate('BachechaUtente')}></Button>
