'use strict';

/* Setup ==================================================================== */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Modal,
    Image,
    Dimensions,
    AsyncStorage
} from 'react-native'
import Button from '../../components/button';
import Prompt from 'react-native-prompt';
import Communications from 'react-native-communications';
import Storage from 'react-native-storage';
import {Container, Content} from 'native-base';

// App Globals
import AppStyles from '../../styles'
import Questionnaire from '../questionnaire'
import Toast, {DURATION} from 'react-native-easy-toast'
/* Component ==================================================================== */
class Home extends Component {
    static componentName = 'Home';

    appStorage = new Storage({
        size: 10000000,
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache: true,
        sync: {}
    });

    constructor(props) {
        super(props);

        this.state = {
            splashScreenVisible: this.props.showSplashScreen || false,
            promptVisible: false,
            codePlaceholder: 'הכנס קוד'
        };
        // this._showCode();
    }

    static propTypes = {
        navigator: React.PropTypes.object.isRequired,
        showSplashScreen: React.PropTypes.bool,
        placeholder: React.PropTypes.string,
    };


    render = () => {
        let width = Dimensions.get('window').width;

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

                                <Prompt
                                    title="Enter Code or Buy New Code"
                                    placeholder={this.state.codePlaceholder}
                                    defaultValue=""
                                    cancelText="Buy new code"
                                    submitText="Enter"
                                    visible={this.state.promptVisible}
                                    onCancel={() => {
                                        Communications.phonecall('0545524348', true)
                                    }}
                                    onSubmit={(value) => this._checkCode(value)}/>

                                <View style={[styles.bgImageWrapper]}>
                                </View>
                                <Text style={{
                                    color: 'white', fontSize: 40, fontFamily: "OpenSansHebrew-Bold",
                                    textShadowOffset: {width: 3, height: 3},
                                    textShadowRadius: 10,
                                    textShadowColor: '#000',
                                    padding: 20, marginTop: 40
                                }}>מה מפריע לך?</Text>


                                <Container style={{height: 324}}><Content>
                                    <Button onPress={() => {
                                        this.props.navigator.push({
                                            title: 'שאלון הסעות',
                                            component: Questionnaire,
                                            index: 2,
                                            padding: 30,
                                            passProps: {fileData: require('../../../assets/q.json'), type: 'test'}
                                        });

                                    }} text="הסעות"/>
                                    <Button onPress={() => {
                                        this.refs.toast.show('עדיין בפיתוח!');
                                    }} style={{padding: 30,}} text="חד״א"/>
                                    <Button onPress={() => {
                                        this.refs.toast.show('עדיין בפיתוח!');
                                    }} style={{padding: 30,}} text="קצ״י"/>
                                    <Button onPress={() => {
                                        this.refs.toast.show('עדיין בפיתוח!');
                                    }} style={{padding: 30,}} text="מרפאה"/>
                                    <Button onPress={() => {
                                        this.refs.toast.show('עדיין בפיתוח!');
                                    }}  style={{padding: 30,}} text="חניות"/>
                                    <Button onPress={() => {
                                        this.refs.toast.show('עדיין בפיתוח!');
                                    }} style={{padding: 30,}} text="מחשוב"/>
                                </Content>
                                </Container>
                            </View>


                        </Content>

                    </Container>
                    <Image
                        style={{
                            height: 50, width: 100, marginLeft: 15,
                            resizeMode: "contain"

                        }} source={{uri: 'stop'}}/>
                    <Toast ref="toast"/>

                </Image>


            </View>
        );
    };

    _checkCode(input) {
        var code = 'hello'; //(s.getDate()+3)*(s.getDate()+2) + "" + s.getMonth()*s.getDate()*2;
        if (input.toLowerCase() == code) {
            this.setState({promptVisible: false});
            this._saveSession()
        } else {
            this.setState({codePlaceholder: 'Invalid code!'});
        }
    }

    _showCode() {
        return this.appStorage.load({
            key: 'showCode',
            autoSync: true,
            syncInBackground: true
        }).then(ret => {
            this.setState({promptVisible: ret.showCode})
        }).catch(err => {
            this._initStorage();
            this.setState({promptVisible: true})
        });
    }

    _initStorage() {
        let ret = {};
        ret.showCode = true;

        this.appStorage.save({
            key: 'showCode',
            rawData: ret,
            expires: null
        })
    };

    _saveSession() {
        let ret = {};
        ret.showCode = false;

        this.appStorage.save({
            key: 'showCode',
            rawData: ret,
            expires: null
        })
    }
}

var styles = StyleSheet.create({
    bgImageWrapper: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgImage: {
        flex: 1,
        resizeMode: "stretch"
    },
});


export default Home