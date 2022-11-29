import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

export default class TwokStyle {

    fontsize = [30, 20, 10];
    fonttype = ['Arial', 'Verdana', 'Georgia']

    createTwokStyle = (bgcol, fontcol, fontsize, fonttype, halign, valign) => {
        const styles = StyleSheet.create(
            {}
        )
    }


}

const styles = StyleSheet.create({
    twokStyle: {
        width: "100%",
        height: Dimensions.get('window').height,
        backgroundColor:'#'+twok.bgcol,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 40,
        fontWeight: "700",
        color: '#'+twok.fontcol
    }
  });