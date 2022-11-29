import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import * as React from 'react';

function Login({navigation}){
    return(
        <View>
            <Text>Siamo nella pagina di login</Text>
            <Button title='GoToBachecaTwok' onPress={() => navigation.navigate('BachecaTwok')}></Button>
        </View>
        
    )
}

export default Login;