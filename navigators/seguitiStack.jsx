import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';

import SeguitiContext from '../context';

import {React, useState, useEffect, useContext, createContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import UtentiSeguiti from '../components/utentiSeguiti';
import BachechaUtente from '../components/bachecaUtente';



const StackBacheca = createNativeStackNavigator();


export default function SeguitiStack(){
    
    return(
            <StackBacheca.Navigator initialRouteName='UtentiSeguiti'>
                <StackBacheca.Screen name='UtentiSeguiti' component={UtentiSeguiti}/>
                <StackBacheca.Screen name='BachechaUtente' component={BachechaUtente}/>
            </StackBacheca.Navigator>
    )
}