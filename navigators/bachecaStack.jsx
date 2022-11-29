import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';

import {React, useState, useEffect, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BachecaTwok from '../components/bachecaTwok';
import BachechaUtente from '../components/bachecaUtente';
import TwokMap from '../components/map';

const StackBacheca = createNativeStackNavigator();

export default function BachecaStack(){
    return(
        <StackBacheca.Navigator initialRouteName='BachecaTwok'>
            <StackBacheca.Screen name='BachecaTwok' component={BachecaTwok}/>
            <StackBacheca.Screen name='BachechaUtente' component={BachechaUtente}/>
            <StackBacheca.Screen name='TwokMap' component={TwokMap} />
        </StackBacheca.Navigator>
    )
}

const styles = StyleSheet.create({
    bar:{
      backgroundColor: '#f4551e'
    }
  })