/**
 * App - set all the things up
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

/* Setup ==================================================================== */
import React, {Component} from 'react'
import {
    Navigator,
    Text,
    View,
    TouchableOpacity,
    Image,
    StatusBar,
    BackAndroid,
    Alert
} from 'react-native'
import {connect} from 'react-redux'
import NavigationBar from 'react-native-navbar'
import SideMenu from 'react-native-side-menu'
const ReactNative = require('react-native');

// Actions
import * as SideMenuActions from '../actions/sidemenu'

// App Globals
import AppStyles from '../styles';
import AppConfig from '../config';
import AppUtil from '../util';

// Google Analytics
import GoogleAnalytics from 'react-native-google-analytics-bridge';
GoogleAnalytics.setTrackerId(AppConfig.gaTrackingId);

// Components
import Menu from '../components/menu';
import NavbarElements from '../components/navbar.elements';

// Screens
import Home from '../screens/home/index';

// Initialize Firebase


/* Component ==================================================================== */
class AppContainer extends Component {


    componentDidMount() {
        // Status Bar
        StatusBar.setHidden(false, 'slide'); // Slide in on load
        // StatusBar.setBackgroundColor(AppConfig.primaryColor, true); // Android Status Bar Color

        BackAndroid.addEventListener('hardwareBackPress', () => {

            if(this.route.component.componentName == 'QuestTest') {
                Alert.alert(
                    'ברצונך לסיים את המשוב?',
                    '',
                    [
                        {
                            text: 'לא', onPress: () => {
                            this.hasPressed = false;
                            questionIndex--;
                        }, style: 'cancel'
                        },
                        {
                            text: 'כן', onPress: () => {
                            this.navigateTo();
                        },
                        },
                    ]
                );

                return true;
            } else if(this.route.component.componentName == 'Home') {
                BackAndroid.exitApp();

                return true;
            } else {
                this._onSideMenuPress('', Home);
                return true;
            }

            return false;
        });

    };

    _onSideMenuPress = (title, component, extraProps) => {
        // Close menu
        this.props.closeSideMenu();

        if (AppUtil.objIsEmpty(extraProps)) extraProps = {};

        // Change Scene
        this.refs.rootNavigator.replace({
            title: title,
            component: component,
            index: 0,
            ...extraProps
        });
    };

    _onSideMenuChange = (isOpen) => {
        if (isOpen != this.props.sideMenuIsOpen) {
            this.props.toggleSideMenu();
        }
    };

    _renderScene = (route, navigator) => {

        this.route = route;

        // Default Navbar Title
        let title = this.route.title ||  AppConfig.appName;

        // Google Analytics
        let screenName = route.component.componentName ? route.component.componentName + ' - ' + title : title;
        GoogleAnalytics.trackScreenView(screenName);

        // Show Hamburger Icon when index is 0, and Back Arrow Icon when index is > 0
        let leftButton = {
            onPress: (route.index > 0)
                ? this.refs.rootNavigator.pop
                : this.props.toggleSideMenu,
            icon: (route.index > 0)
                ? 'ios-arrow-back-outline'
                : 'ios-menu-outline'
        };
        // Show Hamburger Icon when index is 0, and Back Arrow Icon when index is > 0
        let rightButton = {
            onPress: null,
            icon: 'ios-arrow-back-outline'
        };

        // Show a cross icon when transition pops from bottom
        if (route.transition == 'FloatFromBottom') {
            leftButton.icon = 'ios-close-outline';
        }

        return (
            <View style={[AppStyles.appContainer, AppStyles.container]}>
                <NavigationBar
                    title={<NavbarElements.Title title={title || null}/>}
                    statusBar={{style: 'light-content', hidden: false}}
                    style={[AppStyles.navbar]}
                    tintColor={AppConfig.primaryColor}
                    leftButton={<NavbarElements.LeftButton onPress={leftButton.onPress} icon={leftButton.icon}/>}
                />
                {/*rightButton={<NavbarElements.RightButton onPress={rightButton.onPress} icon={rightButton.icon} />}*/}

                <route.component navigator={navigator} route={route} {...route.passProps} />
            </View>
        );
    };


    render() {
        return (
            <SideMenu
                ref="rootSidebarMenu"
                menu={<Menu navigate={this._onSideMenuPress} ref="rootSidebarMenuMenu"/>}
                disableGestures={this.props.sideMenuGesturesDisabled}
                isOpen={this.props.sideMenuIsOpen}
                onChange={this._onSideMenuChange}>

                <Navigator
                    ref="rootNavigator"
                    style={[AppStyles.container, AppStyles.appContainer]}
                    renderScene={this._renderScene}
                    configureScene={function (route, routeStack) {
                        if (route.transition == 'FloatFromBottom')
                            return Navigator.SceneConfigs.FloatFromBottom;
                        else
                            return Navigator.SceneConfigs.PushFromRight;
                    }}
                    initialRoute={{
                        component: Home,
                        index: 0,
                        navigator: this.refs.rootNavigator,
                        passProps: {
                            showSplashScreen: true,
                        }
                    }}/>

            </SideMenu>
        );
    }
}

// Define which part of the state we're passing to this component
const mapStateToProps = (state) => ({
    sideMenuIsOpen: state.sideMenu.isOpen,
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
    toggleSideMenu: SideMenuActions.toggle,
    closeSideMenu: SideMenuActions.close,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
