import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';

import SeguitiContext from '../context';

import {React, useState, useEffect, useContext, createContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import UtentiSeguiti from '../components/utentiSeguiti';
import BachechaUtente from '../components/bachecaUtente';
import TwokMap from '../components/map';



const StackBacheca = createNativeStackNavigator();


export default function SeguitiStack(){
    
    return(
            <StackBacheca.Navigator initialRouteName='UtentiSeguiti'>
                <StackBacheca.Screen name='UtentiSeguiti' component={UtentiSeguiti} options={{
                title: 'Seguiti',
                headerStyle: {
                    backgroundColor: '#F4DF4EFF'
                },
                headerTintColor: 'grey',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}/>
                <StackBacheca.Screen name='BachechaUtente' component={BachechaUtente} options={{
                title: 'Bacheca Utente',
                headerStyle: {
                    backgroundColor: '#F4DF4EFF'
                },
                headerTintColor: 'grey',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}/>
            <StackBacheca.Screen name='TwokMap' component={TwokMap} options={{
                title: 'Mappa',
                headerStyle: {
                    backgroundColor: '#F4DF4EFF'
                },
                headerTintColor: 'grey',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}/>
            </StackBacheca.Navigator>
    )
}