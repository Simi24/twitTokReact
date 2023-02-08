import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, FlatList, Dimensions, Alert, ActivityIndicator } from 'react-native';
import {React, useState, useEffect, Component, useContext} from 'react';
import NetInfo from '@react-native-community/netinfo';
import SeguitiContext from '../context';

import StorageManager from '../model/storeManager';
import TwokLoaderHelper from '../viewModel/twokLoeaderHelper';

import TwokRowUtente from './twokRowUtente';

import HeaderBachecaUtente from './headerBachecaUtente';


const SM = new StorageManager();
const helper = new TwokLoaderHelper();


function BachechaUtente(props){
    let [list, setList] = useState(null)
    const [isReady, setIsReady] = useState(false)

    const handleFollowContext = useContext(SeguitiContext)

    //console.log('seguiti context', handleFollowContext)
    const uid = JSON.stringify(props.route.params.uid);
    const sid = props.route.params.sid


    useEffect(() => {handleRequest().catch(error => console.error(error), setIsReady(false))}, []);

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
        setList(await helper.getUserTwoks(sid, uid))
        setIsReady(true);      
    }

    async function handleScroll() {
        await helper.addUserTwok(sid, uid,list)
        .then(result => 'Twok aggiunti')
        .catch(error => console.log('problema di rete nel caricamento twok ', error));
    }

    const handleNavigationMap = (lat, lon) =>{
      props.navigation.navigate('TwokMap', {
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

        return(
        <SafeAreaView style={styles.container}>
          <View style={{
            flex:1,
            width: '100%',
            flexDirection: 'row'
          }}>
            <HeaderBachecaUtente sid={sid} uid={uid}></HeaderBachecaUtente>
          </View>
          <View style={{
            flex:4,
            width: '100%'
          }}>
            <FlatList style={styles.listStyle} data={list}
            renderItem={(twok)=>{return <TwokRowUtente data={twok} sid={sid} handleNavigationMap={handleNavigationMap}/>}}
            keyExtractor={(twok, index) => index.toString()} 
            snapToInterval={Dimensions.get('window').height}
            snapToAlignment="start"
            decelerationRate="fast"
            onEndReached={handleScroll}
            //Mi fa la richiesta quando mancano 3 elementi da mostrare
            onEndReachedThreshold={3}
            //onScrollEndDrag={()=>{handleScroll()}}
            />
          </View>
          
          <StatusBar style="auto" />

        </SafeAreaView>     
        )
    }
    
}

export default BachechaUtente;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    listStyle: {
      width: "100%",
    }
  });
