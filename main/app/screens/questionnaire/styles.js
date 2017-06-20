'use strict';

import {Platform, Navigator} from 'react-native';


var React = require('react-native');

var {StyleSheet} = React;


module.exports = StyleSheet.create({
    animateAnswerOption: {
        width: 320,
        marginBottom: 5,
        justifyContent: 'center',
        borderRadius: 0,
        paddingHorizontal: 6,
        backgroundColor: "rgba(65, 65, 65, 0.50)",
        borderWidth: 2,
        borderColor: 'white',
    },
    touchableAnswerOption: {},
    textAnswerOption: {
        fontSize: 20,
        lineHeight: 30,
        fontFamily: 'OpenSansHebrew-Regular',
        textAlign: 'center',
        color: "#FFF",
        paddingBottom: 5,
    },
    textQuestion: {
        color: "white",
        fontSize: 30,
        fontFamily: 'OpenSansHebrew-Bold',
        textAlign: 'center',
        lineHeight: 40,
        marginRight: 10,
        marginLeft: 10

    },

    textShadow: {
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 20,
        textShadowColor: '#fff600',
    },

    animateQuestion: {
        marginBottom: 5,
        paddingTop: 25,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        textAlign: 'center',
        backgroundColor:'transparent'
    },
    scoreCounter: {
        alignSelf: 'center',
        marginRight: 0, //Navigator.NavigationBar.Styles.Stages.Left.Title.marginLeft * 0.0 ||
        color: '#764082',
        fontSize: 30,
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: (Platform.OS === 'ios') ? 15 : 1,
        textShadowColor: '#764082',
        paddingTop: (Platform.OS === 'ios') ? 25 : 10,
        paddingBottom: (Platform.OS === 'ios') ? 0 : 10,
        paddingLeft: (Platform.OS === 'ios') ? 30 : 0,
        paddingRight: (Platform.OS === 'ios') ? 25 : 0,
    },

});
