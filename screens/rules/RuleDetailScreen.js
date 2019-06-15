import React from 'react';
import Dimensions from '../../constants/Layout';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Headline,
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

export default class RuleDetailScreen extends React.Component {
  static navigationOptions = {
    headerTransparent: true,
    headerTintColor: 'white',
  };
  
  constructor(props) {
    super(props);

    this.state = {
      rule: this.props.navigation.getParam('rule'),
    };

    this._onEditRecordingRule = this._onEditRecordingRule.bind(this);
  };

  render() {
    const rule = this.state.rule;
    const fanartURI = this.props.screenProps.backendAddr + '/Content/GetRecordingArtwork?Type=fanart&Inetref=' + rule.Inetref;

    return (
      <View style={styles.wrapper}>
        <Image
          source={{uri: fanartURI}}
          style={styles.fanart} />
        <Headline>{rule.Title}</Headline>
        <Button icon="settings" onPress={this._onEditRecordingRule}>Edit Rule</Button>
      </View>
    );
  }

  _onEditRecordingRule() {
    requestAnimationFrame(
      () => this.props.navigation.push('RuleEdit', {'rule': this.state.rule})
    );
  }
}

const fanartImageHeight = Math.round(Dimensions.WindowSize.width * 9 / 16);
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  fanart: {
    width: '100%',
    height: fanartImageHeight,
  },
});
