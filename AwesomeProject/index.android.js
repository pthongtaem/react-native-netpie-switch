/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Animated,
    Dimensions,
    TextInput
} from 'react-native';

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;


import Switch from 'react-native-material-switch';

class AwesomeProject extends React.Component {

    callXToast(text, color) {
        this.setState({onState: text, colorState: color});
        Animated.timing(
            this.animatedXValue,
            {
                toValue: 0,
                duration: 350
            }).start(this.closeXToast())
    }

    closeXToast() {
        setTimeout(() => {
            Animated.timing(
                this.animatedXValue,
                {
                    toValue: -windowWidth,
                    duration: 350
                }).start()
        }, 5000)
    }

    constructor(props) {
        super(props);
        this.state = {
            topic: '',
            onState: 'OFF',
            colorState: 'red', test: true
        };
        this.animatedValue = new Animated.Value(0);
        this.animatedXValue = new Animated.Value(-windowWidth)
    }


    render() {
        var onTextInputChange = (event) => {
            this.setState({topic: event.nativeEvent.text});
            console.log(this.state.topic);
        };

        var onSwitchActivate = async() => {
            this.setState({onState: 'ON', colorState: 'green'});
            let topic = 'https://api.netpie.io/topic/' + this.state.topic + '?auth=Task9JnxtDsOeLt:' +
                'D0plMFJrx3igmngkar718BGGY';

            let reqOpts = {
                method: 'PUT',
                body: 'ON'
            };

            console.log("activate", topic);

            fetch(topic, reqOpts)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson.code);
                    if (responseJson.code == 200) {
                        // alert(JSON.stringify(responseJson));
                        this.callXToast(responseJson.message, 'green');
                        // alert("message: 'FALSE'");
                        // this.callXToast("SUCCESS", 'green');
                    }

                    else {
                        console.log("then", responseJson);
                        // alert(JSON.stringify(responseJson));
                        this.callXToast(responseJson.message, 'red');
                    }


                })

        };

        var onSwitchDeactivate = async() => {
            this.setState({onState: 'OFF', colorState: 'red'});
            fetch('https://api.netpie.io/topic/' + this.state.topic + '?auth=Task9JnxtDsOeLt:D0plMFJrx3igmngkar718BGGY', {
                method: 'PUT',
                body: 'OFF'
            }).then(async(response) => {
                console.log("then", await response.text());
            })
        };



        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.labelNetpie]}>NETPIE</Text>
                </View>
                <View style={styles.body}>
                    { /*<Text style={styles.labelTopic}>Topic example : HelloCMMC/gearname/...</Text>*/ }
                    <TextInput
                        placeholder='Topic e.g. HelloCMMC/gearname/esp01'
                        style={styles.textInput}
                        onChange={onTextInputChange}
                    />
                    {/*<Text style={styles.textState}>{this.state.onState}</Text>*/}
                </View>
                <View style={styles.footer}>
                    {/*<Button onPress={handleStart} style={styles.btnSend}>
                     <Text style={{ fontSize: 30, fontWeight: '200' }}>Send</Text>
                     </Button>*/}
                    <Text style={[styles.labelState, { color: this.state.colorState }]}>{this.state.onState}</Text>
                    <Switch
                        activeBackgroundColor='greenyellow'
                        inactiveBackgroundColor='lightpink'
                        activeButtonColor='forestgreen'
                        activeButtonPressedColor='greenyellow'
                        inactiveButtonColor='red'
                        inactiveButtonPressedColor='hotpink'
                        onActivate={onSwitchActivate}
                        onDeactivate={onSwitchDeactivate}
                    />
                </View>
                <Animated.View
                    style={[styles.animatedView, {
                    transform: [{translateX: this.animatedXValue}],
                    backgroundColor: this.state.colorState }]}>

                    <Text style={[styles.animateText]}>{this.state.onState}

                    </Text>
                </Animated.View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
        // borderColor: 'red',
        // borderWidth: 4
    },
    header: {
        flex: 2,
        // borderColor: 'blue',
        // borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    body: {
        flex: 3,
        // borderColor: 'green',
        // borderWidth: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10
        // justifyContent: 'space-around',
        // alignItems: 'center'
    },
    textInput: {
        paddingLeft: 10,
        paddingRight: 5,
        fontSize: 20,
        fontWeight: '100',
        height: 50,
        borderWidth: 0.5,
        borderColor: 'cornflowerblue',
        borderRadius: 10,
        marginTop: 10
    },
    labelNetpie: {
        fontSize: 70,
        fontWeight: '100'
    },
    labelTopic: {
        fontSize: 20,
        fontWeight: '200'
    },
    labelState: {
        fontSize: 50,
        fontWeight: '100',
        marginBottom: 20
    },
    base: {
        width: 38,
        height: 38
    },
    colorLabelState: {},
    footer: {
        flex: 3,
        // borderColor: 'yellow',
        // borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    btnSend: {
        // alignSelf: 'center',
        // width: 646,
        height: 60,
        backgroundColor: 'azure',
        borderColor: 'cornflowerblue',
        borderWidth: 0.5,
        marginLeft: 10,
        marginRight: 10
    },
    animateText: {
        marginLeft: 10,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    animatedView: {

        backgroundColor: 'green',
        height: 70,
        marginTop: windowHeight - 150,
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowWidth,
        justifyContent: 'center'
    }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
