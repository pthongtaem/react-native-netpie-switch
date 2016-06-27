/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import FormatTime from 'minutes-seconds-milliseconds';
import Button from 'apsl-react-native-button';
import Switch from 'react-native-material-switch';

class AwesomeProject extends Component {

  constructor() {
    super();
    this.state = {
      topic: '',
      onState: 'OFF',
      colorState: 'red', test: true
    }
  }

  render() {

    var onTextInputChange = (event) => {
      this.setState({ topic: event.nativeEvent.text });
      // console.log(this.state.topic);
    }

    var onSwitchActivate = async () => {
      fetch('https://api.netpie.io/topic/' + this.state.topic + '?auth=Task9JnxtDsOeLt:D0plMFJrx3igmngkar718BGGY', {
        method: 'PUT',
        body: 'ON'
      })
    }

    var onSwitchDeactivate = async () => {
      fetch('https://api.netpie.io/topic/' + this.state.topic + '?auth=Task9JnxtDsOeLt:D0plMFJrx3igmngkar718BGGY', {
        method: 'PUT',
        body: 'OFF'
      })
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.labelNetpie]}>NETPIE</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.labelTopic}>Topic example : HelloCMMC/gearname/...</Text>
          <TextInput
            placeholder=' This is topic ...'
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
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 38,
  },
  colorLabelState: {

  },
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
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
