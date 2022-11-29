import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, Image, View } from 'react-native';

import {React, useState, useEffect, Component, useContext} from 'react';

import CommunicationController from '../model/CC';

import SeguitiContext from '../context';

//TODO: si lamenta perchè dovrei usare navigation.setOption per passare la funzione handleModificaProfilo
//Non-serializable values were found in the navigation state

function AreaPersonale({navigation}){
    const[name, setName] = useState(null)
    const[picture, setPicture] = useState(null)

    const SidContext = useContext(SeguitiContext)
    const sid = SidContext.sid
    
    useEffect(() => {CommunicationController.getProfile(sid).then(result => {setName(result.name), setPicture(result.picture)}).catch(e => console.log('errore: ', e))}, [])

    
    async function handleModificaProfilo(name, picture){
        console.log('funzione modifica profilo chiamata')
        console.log('nome e figura modificatiii: ', name, picture)
        await CommunicationController.setProfile(sid, name, picture).catch(e => console.log(e));
        setName(name);
        setPicture(picture)
    }


    if(name == 'unnamed' && picture == null){
        return(
           <SafeAreaView style={styles.container}>
                <View>
                    <Text style={{fontSize:20}}>Immagine del profilo non settata</Text> 
                </View>
               <View style={{
                   alignContent: 'center'
               }}>
                <Image
                    source={require('../images/placeholder_No_Profile_Picture.jpeg')}
                    style={{width: 200, height:200, resizeMode: 'contain'}}
                    />
               </View>
            <Text style={{fontSize:20}}>Non hai ancora settato un nome utente</Text>
            <Button title='Modifica Profilo' onPress={() => navigation.navigate('ModificaProfilo', {name: name, picture: picture, handleModificaProfilo: handleModificaProfilo})}/>
        </SafeAreaView> 
        )
        
    } else if(picture == null) {
        return(
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={{fontSize:20}}>Immagine del profilo non settata</Text> 
                </View>
                <View style={{
                    alignContent: 'center'
                }}>
                 <Image
                     source={require('../images/placeholder_No_Profile_Picture.jpeg')}
                     style={{width: 200, height:200, resizeMode: 'contain'}}
                     />
                </View>
             <Text style={{fontSize:30}}>{name}</Text>
             <Button title='Modifica Profilo' onPress={() => navigation.navigate('ModificaProfilo', {name: name, picture: picture, handleModificaProfilo: handleModificaProfilo})}/>
         </SafeAreaView> 
         )
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={{
                flex: 1
            }}>
            <Image
                source={{uri:
                    'data:image/png;base64,' + (picture)}} style={{width: 200, height:200, resizeMode: 'contain'}}
            />
            </View>
            <View style={{
                flex: 1
            }}>
                <Text style={{fontSize:30}}>{name}</Text>
            </View>
            <View style={{
                flex: 1
            }}>
                <Button title='Modifica Profilo' onPress={() => navigation.navigate('ModificaProfilo', {name: name, picture: picture, handleModificaProfilo: handleModificaProfilo})}/>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center'
    }
})

export default AreaPersonale;