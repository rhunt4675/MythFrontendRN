import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Button,
  TextInput,
} from 'react-native-paper';
import { 
  Ionicons, 
  Entypo,
} from '@expo/vector-icons';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this._onHostnameChanged = this._onHostnameChanged.bind(this);
    this._onPortChanged = this._onPortChanged.bind(this);
    this._onAddressSubmitted = this._onAddressSubmitted.bind(this);
    this._isValidHostname = this._isValidHostname.bind(this);
    this._isValidPort = this._isValidPort.bind(this);

    var [hostname, port] = this._parseBackendAddress();
    this.state = {
      hostname: hostname,
      port: port,
      origHostname: hostname,
      origPort: port,
      testRunning: false,
      testSucceeded: true,
    }
  }

  componentDidMount() {
    this._testConnectivity();
  }

  _getCurrentBackendAddress() {
    return 'http://' + this.state.hostname + ':' + this.state.port;
  }

  _parseBackendAddress() {
    var hostname, port;
    try {
      const url = new URL(this.props.screenProps.backendAddr);
      hostname = url.hostname;
      port = url.port;
    } catch (error) {
      console.warn('Error parsing saved backend address [url=' + this.props.screenProps.backendAddr + ']: ' + error);
    }
    return [hostname, port];
  }

  _onHostnameChanged(newHostname) {
    this.setState({
      hostname: newHostname,
    }, () => this._testConnectivity());
  }

  _onPortChanged(newPort) {
    this.setState({
      port: newPort,
    }, () => this._testConnectivity());
  }

  _onAddressSubmitted() {
    this.props.onBackendAddrChanged(this._getCurrentBackendAddress());
  }

  _isValidHostname() {
    const hostname = this.state.hostname;
    const IP_REGEX = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
    const HOST_REGEX = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;

    return hostname && (IP_REGEX.test(hostname) || HOST_REGEX.test(hostname));
  }

  _isValidPort() {
    const port = this.state.port;
    return port && (port >= 0 && port <= 65535);
  }

  _testConnectivity() {
    this.setState({
      testRunning: true,
    });

    let backendAddr = this._getCurrentBackendAddress();
    fetch(backendAddr + '/Myth/GetBackendInfo', {headers: {'Accept': 'application/json'}})
      .then(response => {
        if (this._getCurrentBackendAddress() === backendAddr) {
          this.setState({
            testRunning: false,
            testSucceeded: true,
          });
        }
      })
      .catch(error => {
        if (this._getCurrentBackendAddress() === backendAddr) {
          this.setState({
            testRunning: false,
            testSucceeded: false,
          });
        }
      });
  }

  render() {
    const buttonDisabled = (this.state.hostname === this.state.origHostname && this.state.port === this.state.origPort)
        || !this._isValidHostname() || !this._isValidPort();
    const connectionStatusText = this.state.testRunning ? 'Testing Connection' 
        : (this.state.testSucceeded ? 'Connection Succeeded' : 'Connection Failed');
    
    return (
      <View style={styles.wrapper}>
        <TextInput
          label='Backend Hostname'
          value={this.state.hostname}
          placeholder={'ex. 192.168.1.101 or mythtv.internal.home'}
          mode='outlined'
          error={!this._isValidHostname()}
          onChangeText={this._onHostnameChanged} />
        <TextInput
          label='Backend Port'
          value={this.state.port}
          placeholder={'ex. 6544'}
          mode='outlined'
          error={!this._isValidPort()}
          onChangeText={this._onPortChanged} />
        <View style={styles.buttonRow}>
          <View style={styles.statusIconBox}>
            {this.state.testRunning && <ActivityIndicator size={32} color="blue" />}
            {!this.state.testRunning && this.state.testSucceeded && <Ionicons name="md-checkbox" size={32} color="green" />}
            {!this.state.testRunning && !this.state.testSucceeded && <Entypo name="squared-cross" size={32} color="red" />}
          </View>
          <Text style={styles.statusText}>{connectionStatusText}</Text>
          <Button
            mode='contained'
            disabled={buttonDisabled}
            onPress={this._onAddressSubmitted}>Submit</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: 10,
    alignContent: 'center',
  },
  statusIconBox: {
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  statusText: {
    flex: 1,
    textAlignVertical: 'center',
  },
});