'use strict';

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Modal,
    Image,
    Dimensions,
    Platform,
    ScrollView,
    TextInput

} from 'react-native'
import {WebView, Linking} from 'react-native';
import * as Progress from 'react-native-progress';
import {Container, Content} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';


import * as Animatable from 'react-native-animatable';

import styles from './styles';
import controllerTest from './questTest.controller'

// App Globals
import AppStyles from '../../styles'


const firebase = require("firebase");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA6TjtSW85v3_YMX7VFUwcw064aj-meVDU",
    authDomain: "boiling-torch-1957.firebaseapp.com",
    databaseURL: "https://boiling-torch-1957.firebaseio.com",
    storageBucket: "gs://boiling-torch-1957.appspot.com",
    messagingSenderId: "865900344487"
};
firebase.initializeApp(config);

// Screens
import Home from '../home';


class Questionnaire extends Component {
    static componentName = 'Questionnaire';

    controller;

    constructor(props) {
        super(props);
        this.tomChild = this.getRef().child("tom");

        this.controller = controllerTest;
        this.state = this.controller.initSprint(this.props.fileData, this.setState.bind(this), this._navigateToResults.bind(this), props);
    }

    getRef() {
        return firebase.database().ref();
    }

    componentDidMount() {
        // this.tomChild.on('value', snapshot => {
        //     this.setState({data: snapshot.val()});
        // });

    }

    static propTypes = {
        navigator: React.PropTypes.object.isRequired,
        showSplashScreen: React.PropTypes.bool,
        placeholder: React.PropTypes.string,
    };

    _navigateToResults = (testResults) => {
        this.props.navigator.replace({
            component: Home,
            index: 0
        });
        // this.props.navigator.push({
        //     title: 'ผล', //תוצאות
        //     component: TestResults,
        //     index: 2,
        //     passProps: {testResults}
        // });
    };


    render = () => {
        let width = Dimensions.get('window').width;
        let height = Dimensions.get('window').height;

        return (
            <View style={{flex: 1,}}>
                <Image source={{uri: 'test_background'}} style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: 'cover'
                }}>
                    <Container>
                        <Content style={{flex: 1,}}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text>{ this.state.data}</Text>

                                <Animatable.Text ref="quest" animation="fadeIn" easing="ease-out" duration={600}
                                                 iterationCount={1} style={styles.animateQuestion}>
                                    <Text
                                        style={[styles.textQuestion, styles.textShadow, {fontSize: this.state.questionFontSize}]}>
                                        {this.state.question}
                                    </Text>
                                </Animatable.Text>

                                {/*<Image source={{uri: this.state.img}}*/}
                                {/*resizeMode='contain'*/}
                                {/*style={{width: 200, height: (this.state.img ? 150 : 0), marginBottom: 15}}/>*/}

                                <TouchableOpacity
                                    onPress={() => {
                                        this._handleOptionPressed(0);
                                    }}
                                    style={{marginBottom: 15}}>
                                    <Animatable.View ref="an1" animation="bounceInRight" easing="ease-out"
                                                     duration={600}
                                                     iterationCount={1}
                                                     style={[styles.animateAnswerOption,
                                                         this.state.buttonsBackgroundColors[0] != 'transparent' && {backgroundColor: this.state.buttonsBackgroundColors[0]},]}>
                                        <Text style={styles.textAnswerOption}>{this.state.a}</Text>
                                    </Animatable.View >
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        this._handleOptionPressed(1);
                                    }}
                                    style={{marginBottom: 15}}>
                                    <Animatable.View ref="an2" animation="bounceInLeft" easing="ease-out"
                                                     duration={600}
                                                     iterationCount={1}
                                                     style={[styles.animateAnswerOption,
                                                         this.state.buttonsBackgroundColors[1] != 'transparent' && {backgroundColor: this.state.buttonsBackgroundColors[1]}]}>
                                        <Text style={styles.textAnswerOption}>{this.state.b}</Text>
                                    </Animatable.View >
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        this._handleOptionPressed(2);
                                    }}
                                    style={{marginBottom: 15}}>
                                    <Animatable.View ref="an3" animation="bounceInRight" easing="ease-out"
                                                     duration={600}
                                                     iterationCount={1}
                                                     style={[styles.animateAnswerOption,
                                                         this.state.buttonsBackgroundColors[2] != 'transparent' && {backgroundColor: this.state.buttonsBackgroundColors[2]}]}>
                                        <Text style={styles.textAnswerOption}>{this.state.c}</Text>
                                    </Animatable.View >
                                </TouchableOpacity>

                                {/*<TouchableOpacity*/}
                                    {/*onPress={() => {*/}
                                        {/*this._handleOptionPressed(3);*/}
                                    {/*}}*/}
                                    {/*style={{marginBottom: 15}}>*/}
                                    {/*<Animatable.View ref="an4" animation="bounceInLeft" easing="ease-out"*/}
                                                     {/*duration={600}*/}
                                                     {/*iterationCount={1}*/}
                                                     {/*style={[styles.animateAnswerOption,*/}
                                                         {/*this.state.buttonsBackgroundColors[3] != 'transparent' && {backgroundColor: this.state.buttonsBackgroundColors[3]}]}>*/}
                                        {/*<Text style={styles.textAnswerOption}>{this.state.d}</Text>*/}
                                    {/*</Animatable.View >*/}
                                {/*</TouchableOpacity>*/}


                                <TouchableOpacity

                                    style={{marginBottom: 15}}>
                                    <Animatable.View ref="an5" animation="bounceInLeft" easing="ease-out"
                                                     duration={600}
                                                     iterationCount={1}
                                    >

                                        <TextInput
                                            style={[styles.animateAnswerOption, {
                                                color: 'white',
                                                height: 40,
                                                borderColor: 'gray',
                                                borderWidth: 1,
                                                textAlign: 'center',
                                            }]}
                                            placeholder="הערות"
                                            placeholderTextColor='white'
                                            onChangeText={(text) => this.setState({text})}
                                            value={this.state.text}
                                        />

                                    </Animatable.View >
                                </TouchableOpacity>


                            </View>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 5,
                                marginRight: 5,
                                marginBottom: -30

                            }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.controller.showNextQuestion(this.refs, this.state);
                                    }}
                                    style={{width: 30, height: 80}}>
                                    <Icon name={'ios-arrow-back'} size={60} color={"#FFFF"}/>
                                </TouchableOpacity>

                                <View style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 100
                                }}>

                                </View>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.controller.showPreviousQuestion(this.refs, this.state);
                                    }}
                                    style={{width: 30, height: 80}}>
                                    <Icon name={'ios-arrow-forward'} size={60} color={"#FFFF"}/>
                                </TouchableOpacity>
                            </View>
                        </Content>
                    </Container>
                    <Image
                        style={{height:50, width:100, marginLeft: 15,
                            resizeMode: "contain"

                        }}  source={{uri: 'stop'}} />
                </Image>
            </View>

        );
    };

    componentWillUnmount() {
        this.controller.hasExit = true;
    }


    _handleOptionPressed(pressedAnswer) {
        this.controller.handleOptionPressed(pressedAnswer, this.refs, this.state);
    }

    _mute = function () {
        if (this.state.sound == 'volume-up') {
            this.setState({sound: 'volume-off'})
        } else {
            this.setState({sound: 'volume-up'})
        }
    };


}


let myTheme = {
    brandPrimary: "#fcb625",
    brandInfo: "#5bc0de",
    brandSuccess: "#5cb85c",
    brandDanger: "#d9534f",
    brandWarning: "#f0ad4e",
    brandSidebar: "#252A30",

    fontFamily: 'OpenSansHebrew-Regular', //(Platform.OS === 'ios' ) ? 'HelveticaNeue' : 'Roboto',
    btnFontFamily: 'OpenSansHebrew-Bold', //(Platform.OS === 'ios' ) ? 'HelveticaNeue' : 'Roboto_medium',
    iconFamily: 'MaterialIcons',

    subtitleColor: '#8e8e93',

    inverseTextColor: "#000",
    textColor: "#fff",

    fontSizeBase: 15,
    titleFontSize: (Platform.OS === 'ios' ) ? 17 : 19,
    subTitleFontSize: (Platform.OS === 'ios' ) ? 12 : 14,

    inputFontSize: 15,
    inputLineHeight: 18,

    get fontSizeH1() {
        return this.fontSizeBase * 1.8;
    },
    get fontSizeH2() {
        return this.fontSizeBase * 1.6;
    },
    get fontSizeH3() {
        return this.fontSizeBase * 1.4;
    },
    get btnTextSize() {
        return (Platform.OS === 'ios') ? this.fontSizeBase * 1.1 :
        this.fontSizeBase - 1;
    },
    get btnTextSizeLarge() {
        return this.fontSizeBase * 1.5;
    },
    get btnTextSizeSmall() {
        return this.fontSizeBase * .8;
    },
    get iconSizeLarge() {
        return this.iconFontSize * 1.5;
    },
    get iconSizeSmall() {
        return this.iconFontSize * .6;
    },

    buttonPadding: 6,

    borderRadiusBase: (Platform.OS === 'ios' ) ? 5 : 2,

    get borderRadiusLarge() {
        return this.fontSizeBase * 3.8;
    },

    footerHeight: 55,
    toolbarHeight: (Platform.OS === 'ios' ) ? 64 : 56,
    toolbarDefaultBg: "#fcb625",
    toolbarInverseBg: "#222",

    iosToolbarBtnColor: '#fff',

    toolbarTextColor: '#fff',

    checkboxBgColor: '#039BE5',
    checkboxTickColor: '#fff',

    checkboxSize: 23,

    radioColor: '#7e7e7e',
    get radioSelectedColor() {
        return Color(this.radioColor).darken(0.2).hexString();
    },

    radioBtnSize: (Platform.OS === 'ios') ? 25 : 23,

    tabBgColor: "#00c497",
    tabFontSize: 20,
    tabTextColor: "#fff",

    btnDisabledBg: '#b5b5b5',
    btnDisabledClr: '#f1f1f1',

    cardDefaultBg: '#fff',

    get darkenHeader() {
        return Color(this.tabBgColor).darken(0.03).hexString();
    },

    get statusBarColor() {
        return Color(this.toolbarDefaultBg).darken(0.1).hexString();
    },

    get btnPrimaryBg() {
        return this.brandPrimary;
    },
    get btnPrimaryColor() {
        return this.inverseTextColor;
    },
    get btnSuccessBg() {
        return this.brandSuccess;
    },
    get btnSuccessColor() {
        return this.inverseTextColor;
    },
    get btnDangerBg() {
        return this.brandDanger;
    },
    get btnDangerColor() {
        return this.inverseTextColor;
    },
    get btnInfoBg() {
        return this.brandInfo;
    },
    get btnInfoColor() {
        return this.inverseTextColor;
    },
    get btnWarningBg() {
        return this.brandWarning;
    },
    get btnWarningColor() {
        return this.inverseTextColor;
    },

    borderWidth: 1,
    iconMargin: 7,

    get inputColor() {
        return this.textColor;
    },
    get inputColorPlaceholder() {
        return 'rgba(255, 255, 255, 1.0)';
    },

    inputBorderColor: "#fff",
    inputSuccessBorderColor: '#2b8339',
    inputErrorBorderColor: '#ed2f2f',
    inputHeightBase: 40,
    inputGroupMarginBottom: 10,
    inputPaddingLeft: 5,
    get inputPaddingLeftIcon() {
        return this.inputPaddingLeft * 8;
    },

    btnLineHeight: 19,

    dropdownBg: "#000",
    dropdownLinkColor: "#414142",

    jumbotronPadding: 30,
    jumbotronBg: "#C9C9CE",

    contentPadding: 10,

    listBorderColor: "rgba(181, 181, 181, 0.34)",
    listDividerBg: "#f2f2f2",
    listItemPadding: 15,
    listNoteColor: "#bababa",
    listNoteSize: 13,
    listBg: "#fff",

    iconFontSize: (Platform.OS === 'ios' ) ? 30 : 28,

    badgeColor: "#fff",
    badgeBg: "#ED1727",

    lineHeight: (Platform.OS === 'ios') ? 21 : 25,
    iconLineHeight: (Platform.OS === 'ios' ) ? 37 : 30,

    toolbarIconSize: (Platform.OS === 'ios' ) ? 20 : 22,

    toolbarInputColor: '#CECDD2',

    defaultSpinnerColor: "#45D56E",
    inverseSpinnerColor: "#1A191B",

    defaultProgressColor: "#E4202D",
    inverseProgressColor: "#1A191B"
}

export default Questionnaire