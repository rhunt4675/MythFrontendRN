import React from 'react';
import {
  Text,
  ScrollView,
} from 'react-native';
import {
  Title,
} from 'react-native-paper';

export default class StatusScreen extends React.Component {
  static navigationOptions = {
    title: 'Backend Status',
  };

  constructor(props) {
    super(props);
    this.state = {
      StatusInfo: undefined,
      BackendInfo: undefined,
      EncoderInfo: undefined,
    };

    this._refresh = this._refresh.bind(this);
  };

  componentDidMount() {
    this._refresh();
  }

  _refresh() {
    // this._getStatusInfo();
    this._getBackendInfo();
    this._getEncoderInfo();
  }

  _getStatusInfo() {
    fetch(this.props.screenProps.backendAddr + '/Status/GetStatus')
      .then(response => response.text())
      .then(response => {
        this.setState({
          StatusInfo: response
        })
      })
      .catch(error => {
        console.warn('Error Fetching Status Info: ' + error);
      })
  }

  _getBackendInfo() {
    fetch(this.props.screenProps.backendAddr + '/Myth/GetBackendInfo', {headers: {'Accept': 'application/json'}})
      .then(response => response.json())
      .then(response => {
        this.setState({
          BackendInfo: response
        });
      })
      .catch(error => {
        console.warn('Error Fetching Backend Info: ' + error);
      });
  }

  _getEncoderInfo() {
    fetch(this.props.screenProps.backendAddr + '/Dvr/GetEncoderList', {headers: {'Accept': 'application/json'}})
      .then(response => response.json())
      .then(response => {
        this.setState({
          EncoderInfo: response
        });
      })
      .catch(error => {
        console.warn('Error Fetching Encoder List: ' + error);
      });
  }

  render() {
    return (
      <ScrollView>
        {this.state.BackendInfo &&
          <Text><Text style={{fontWeight: 'bold'}}>Version: </Text>{this.state.BackendInfo.BackendInfo.Build.Version}</Text>}
        
        <Title>/Myth/GetBackendInfo</Title>
        <Text>{JSON.stringify(this.state.BackendInfo)}</Text>

        <Title>/Dvr/GetEncoderInfo</Title>
        <Text>{JSON.stringify(this.state.EncoderInfo)}</Text>
      </ScrollView>
    );
  }
}
