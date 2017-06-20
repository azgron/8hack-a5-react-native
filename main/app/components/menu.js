/**
 * Menu Contents
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

/* Setup ==================================================================== */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    Image
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Communications from 'react-native-communications';
// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

// Screens
import Home from '../screens/home'
import Questionnaire from '../screens/questionnaire'

/* Component ==================================================================== */
class Menu extends Component {
    constructor() {
        super();

        // Initial state
        this.state = {
            menu: [
                {title: 'בית', icon: 'ios-home', component: Home},
                {
                    title: 'ענה על סקר',
                    icon: 'ios-timer',
                    component: Questionnaire,
                    props: {passProps: {fileData: require('../../assets/q.json'), type: 'test'}}
                },
            ],
        };
    }

    static propTypes = {
        navigate: React.PropTypes.func.isRequired,
    };

    /**
     * RENDER
     */
    render = () => {
        let {navigate} = this.props;
        let {menu} = this.state;

        // Build the actual Menu Items
        let menuItems = [];
        menu.map((item) => {
            let {title, icon, component, props} = item;

            menuItems.push(
                <TouchableOpacity key={'menu-item-' + title}
                                  onPress={() => {
                                      if (React.Component.isPrototypeOf(component)) {
                                          navigate(title, component, props);
                                      } else {
                                          component();
                                      }
                                  }}>
                    <View style={[styles.menuItem]}>
                        <Text style={[AppStyles.baseText, styles.menuItem_text]}>{title}</Text>
                        <Icon style={[styles.menuItem_icon]} name={icon} size={35} color={"#FFFF"}/>
                    </View>
                </TouchableOpacity>
            );
        });

        return (
            <View style={[styles.menuContainer]}>
                <View style={[styles.menu]}>{menuItems}</View>
            </View>
        );
    }
}


/* Styles ==================================================================== */
const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        left: 0,
        right: 0,
        backgroundColor: "#0063f5",
    },
    menu: {
        flex: 1,
        left: 0,
        right: 0,
        height: AppConfig.windowHeight,
        backgroundColor: "#0063f5",
        padding: 20,
        paddingTop: AppConfig.statusBarHeight,
    },
    menuItem: {
        flex: 1,
        flexDirection: 'row', justifyContent: 'flex-start',
        borderBottomWidth: 2,
        borderBottomColor: "#fff",
        paddingBottom: 10,
    },

    menuItem_icon: {
        textAlign: 'right',
        marginTop: 10,
        marginLeft: 10,
        color: "#FFF"
    },
    menuItem_text: {
        fontSize: 18,
        textAlign: 'right',
        lineHeight: parseInt(18 + (18 * 0.5)),
        fontWeight: '500',
        marginTop: 13,
        flex: 1,
        color: "#EEE"
    },
});

/* Export Component ==================================================================== */
export default Menu