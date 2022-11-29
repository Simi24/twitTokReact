import { StyleSheet, Text, View, Button } from 'react-native';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ModificaProfilo from '../components/modificaProfilo';

import AreaPersonale from '../components/areaPersonale';

const StackProfilo = createNativeStackNavigator();

export default function ProfiloStack(){
    return(
        <StackProfilo.Navigator initialRouteName='BachecaTwok'>
            <StackProfilo.Screen name='AreaPersonale' component={AreaPersonale}/>
            <StackProfilo.Screen name='ModificaProfilo' component={ModificaProfilo}/>
        </StackProfilo.Navigator>
    )
}