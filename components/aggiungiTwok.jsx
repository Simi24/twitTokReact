import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, Dimensions, Switch, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import NetInfo from '@react-native-community/netinfo';
import {React, Component, useContext, useState, useEffect} from 'react';
import SeguitiContext from '../context';
import CommunicationController from '../model/CC';
import * as Location from 'expo-location';
import { clear } from 'react-native/Libraries/LogBox/Data/LogBoxData';

function AggiungiTwok(){
    const [isEnabled, setIsEnabled] = useState(false);
    const [enableButton, setEnableButton] = useState(false);

    const[text, setText] = useState("Testo del twok")
    const[color, setColor] = useState("ffffff")
    const[textColor, setTextColor] = useState("000000")
    const[textDimension, setTextDimension] = useState(0)
    const[fontType, setFontType] = useState(0)
    const[hAlign, setHalign] = useState(0)
    const[vAlign, setValign] = useState(0)
    const [lat , setLat] = useState(null)
    const [lon, setLon] = useState(null)
    const [location, setLocation] = useState(null)

    const handleFollowContext = useContext(SeguitiContext)

    const sid = handleFollowContext.sid

    useEffect(() => {checkPermission()}, []);

    const fontsize = [20, 30, 40];
    const fonttype = ['System', 'monospace', 'serif'];
    const halign = ['flex-start' ,'center' ,'flex-end'];
    const valign = ['flex-start' ,'center' ,'flex-end'];

    const styles = StyleSheet.create({
        input: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        },
        twokStyle: {
            width: "100%",
            height: Dimensions.get('window').height,
            backgroundColor: '#' + color,
            
            flex: 1
        },
        textStyle: {
            fontSize: fontsize[textDimension],
            fontFamily: fonttype[fontType],
            fontWeight: "700",
            color: '#' + textColor,
        }
    });

    function clearAll(){
        setText("Testo del twok")
        setColor("ffffff")
        setTextColor("000000")
        setTextDimension(0)
        setFontType(0)
        setHalign(0)
        setValign(0)
        setIsEnabled(false)
    }
    
    async function checkPermission(){
        const state = await NetInfo.fetch();
        if(!state.isConnected){
            Alert.alert(
            'Problemi di rete',
            'Verifica la connessione e riprova',
            [{text: 'OK', onPress: () => {checkPermission()}}],
            {cancelable: false},
            );
        }
    }

    async function locationPermissionAsync(){
        setEnableButton(true);
        let canUseLocation = false;
        const grantedPermission = await Location.getForegroundPermissionsAsync()
        if (grantedPermission.status === "granted"){
          canUseLocation = true;
        } else {
          const permissionResponse = await Location.requestForegroundPermissionsAsync()
          if (permissionResponse.status === "granted") {
            canUseLocation = true;
          }
        }
        if(canUseLocation){
          const location = await Location.getCurrentPositionAsync()
          console.log("recived location:", location);
          setLat(location.coords.latitude)
          setLon(location.coords.longitude)
          setLocation(location.coords.latitude + '-' + location.coords.latitude)
          setEnableButton(false);
        }else{
            console.log("permessi non concessi");
            setIsEnabled(false);
                        setEnableButton(false);
            Alert.alert(
                'Permesso negato',
                'Per inserire la posizione devi concedere i permessi',
                [{text: 'OK', onPress: () => {}}],
                {cancelable: false},
            );
        }
      }
    

      const handleGetPosition = () => {
          if(isEnabled){
              setLat(null),
              setLon(null),
              setIsEnabled(previousState => !previousState)
          } else {
              locationPermissionAsync()
            .then(result => console.log(lat, lon))
            setIsEnabled(previousState => !previousState)
          }
      }
    

      async function handlePress(){
        //console.log('pulsante schiacciato')
        setEnableButton(true);

        
        
        if(text.length < 100){
            console.log('lat e lon quando creo', lat, lon)
            try {
                await CommunicationController.addTwok(sid, text, color, textColor, textDimension, fontType, hAlign, vAlign, lat, lon).catch(e => console.log('errore in handlePress aggiungiTwok: ', e));
                clearAll(); 
            } catch (error) {
                Alert.alert(
                    'Problemi di rete',
                    'Verifica la connessione e riprova',
                    [{text: 'OK', onPress: () => {handlePress()}}],
                    {cancelable: false},
                );
            }
            
            alert('Twok creato correttamente')
            setEnableButton(false)
            return;
        } else {
            alert('Il testo inserito è troppo lungo');
            setEnableButton(false)
            return;
        }
        
      }

    return(
        <SafeAreaView style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: 10,
            paddingTop: 20
        }}>
            <View style={{
                
            }}>
                <TextInput
                    style ={styles.input}
                    placeholder='Inserisci il testo del twok'
                    onChangeText={setText}
                />
            </View>
            <View style={{
            
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            }}>
                <View style={{
                    flex: 1
                }}>
                    <Text>Sfondo:</Text>
                    <Picker
                        selectedValue={color}
                        onValueChange={(itemValue, itemIndex) =>
                        setColor(itemValue)
                    }>
                    <Picker.Item label="Rosso" value="ff0000" />
                    <Picker.Item label="Blu" value="0000ff" />
                    <Picker.Item label='Azzurro' value="87ceeb"/>
                    <Picker.Item label='Giallo' value="ffff00"/>
                    <Picker.Item lable='Verde' value="00ff7f"/>
                    <Picker.Item label="Bianco" value="ffffff" />
                    </Picker>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <Text>Posizione Verticale:</Text>
                    <Picker
                        selectedValue={hAlign}
                        onValueChange={(itemValue, itemIndex) =>
                        setHalign(itemValue)
                    }>
                    <Picker.Item label="Alto" value={0} />
                    <Picker.Item label="Centro" value={1} />
                    <Picker.Item label='Basso' value={2}/>
                    </Picker>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <Text>Posizione Orizzontale:</Text>
                    <Picker
                        selectedValue={vAlign}
                        onValueChange={(itemValue, itemIndex) =>
                        setValign(itemValue)
                    }>
                    <Picker.Item label="Sinistra" value={0} />
                    <Picker.Item label="Centro" value={1} />
                    <Picker.Item label='Destra' value={2}/>
                    </Picker>
                </View>
            </View>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            }}>
                <View style={{
                    flex: 1
                }}>
                    <Text>Colore testo:</Text>
                    <Picker
                        selectedValue={textColor}
                        onValueChange={(itemValue, itemIndex) =>
                        setTextColor(itemValue)
                    }>
                    <Picker.Item label="Rosso" value="ff0000" />
                    <Picker.Item label="Blu" value="0000ff" />
                    <Picker.Item label='Azzurro' value="87ceeb"/>
                    <Picker.Item label='Giallo' value="ffff00"/>
                    <Picker.Item lable='Verde' value="00ff7f"/>
                    <Picker.Item label="Nero" value="000000" />
                    </Picker>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <Text>Dimensione testo:</Text>
                    <Picker
                        selectedValue={textDimension}
                        onValueChange={(itemValue, itemIndex) =>
                        setTextDimension(itemValue)
                    }>
                    <Picker.Item label="Piccolo" value={0} />
                    <Picker.Item label="Medio" value={1} />
                    <Picker.Item label='Grosso' value={2}/>
                    </Picker>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <Text>Font:</Text>
                    <Picker
                        selectedValue={fontType}
                        onValueChange={(itemValue, itemIndex) =>
                        setFontType(itemValue)
                    }>
                    <Picker.Item label="System" value={0} />
                    <Picker.Item label="monospace" value={1} />
                    <Picker.Item label='serif' value={2}/>
                    </Picker>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'space-between'
            }}>
                <View>
                    <Text style={{fontSize: 20}}>Vuoi inserire la posizione?     </Text>
                </View>
                <View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={handleGetPosition}
                        value={isEnabled}
                    />
                </View>
            </View>
            <View>
                <Button title='CREA' onPress={handlePress} disabled={enableButton} color = 'black'></Button>
            </View>
            <View style={{
                flex: 4
            }}>
                <Text>Risultato:</Text>
                <View style={styles.twokStyle}>
                    <View style={{
                            flex: 4,
                            justifyContent: halign[hAlign],
                            alignItems: valign[vAlign]
                    }}>
                        <Text style={styles.textStyle}>{text}</Text> 
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )

}




export default AggiungiTwok;