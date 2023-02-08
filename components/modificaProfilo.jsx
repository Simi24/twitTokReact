import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button, TextInput, View, Image,TouchableOpacity, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {React, useEffect, useContext, useState} from 'react';
import * as ImagePicker from 'expo-image-picker';

function ModificaProfilo({route, navigation}){
    const [name, setName] = useState(route.params.name)
    const [picture, setPicture] = useState(route.params.picture)
    

    //useEffect(() => {setName(route.params.name)}, [])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          base64: true,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        console.log('Immagine presa');
    
        if (!result.canceled) {
          setPicture(result.assets[0].base64);
        }
    };

    async function handleModifiche(name, picture){


        const state = await NetInfo.fetch();
        console.log(state.isConnected)
        if(!state.isConnected){
            Alert.alert(
            'Problemi di rete',
            'Verifica la connessione e riprova',
            [{text: 'OK', onPress: () => {handleModifiche()}}],
            {cancelable: false},
            );
        }

        if(name.length > 20){
            alert('Il nome deve essere più corto di 20 caratteri')
            return
        }
        if(picture != null) {
            if(picture.length > 137000){
                alert("L'immagine caricata è troppo grossa")
            return
            }
        }
            route.params.handleModificaProfilo(name, picture);
            navigation.navigate('AreaPersonale')
            alert('Profilo modificato')
    }

        return(
            <SafeAreaView style={styles.container}>
                <View>
                    <TouchableOpacity onPress={pickImage}>
                        {picture == null ?
                            <Image
                                source={require('../images/placeholder_No_Profile_Picture.jpeg')}
                                style={{width: 200, height:200, resizeMode: 'contain'}}
                            />
                        :
                            <Image
                                source={{uri:
                                'data:image/png;base64,' + (picture)}} style={{width: 200, height:200, resizeMode: 'contain'}}
                            />
                        }
                        
                    </TouchableOpacity>  
                </View>
                <View>
                    <Text style={{fontSize:30}}>{route.params.name}</Text>
                </View>
                <View>
                    <TextInput
                        value={name}
                        style={styles.input}
                        onChangeText={(text) => {setName(text)}}
                    />
                </View>
                <View>
                    <Button title='Modifica' onPress={() => handleModifiche(name, picture)} color = 'black'></Button>
                </View>
            </SafeAreaView>
            )
    

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
})

export default ModificaProfilo;