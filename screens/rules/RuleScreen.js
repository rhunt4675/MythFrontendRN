import React from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {

} from 'react-native-paper';
import { RuleCard } from '../../components/RuleCard';
import { EmptyPlaceholder } from '../../components/EmptyPlaceholder';
import { ErrorPlaceholder } from '../../components/ErrorPlaceholder';

export default class RulesScreen extends React.Component {
  static navigationOptions = {
    title: 'Recording Rules',
  };

  constructor(props) {
    super(props);
    this._refresh = this._refresh.bind(this);
    this._onRulePressed = this._onRulePressed.bind(this);

    this.state = {
      LoadingComplete: true,
      RuleList: [],
      Errored: false,
    };
  }

  componentDidMount() {
    this._refresh();
  }

  _refresh() {
    this.setState({
      LoadingComplete: false,
      Errored: false,
    });
    this._fetchRuleList();
  }

  _fetchRuleList() {
    fetch(this.props.screenProps.backendAddr + '/Dvr/GetRecordScheduleList', {headers: {'Accept': 'application/json'}})
      .then(response => response.json())
      .then(response => {
        this.setState({
          LoadingComplete: true,
          RuleList: response.RecRuleList.RecRules,
          Errored: false,
        });
      })
      .catch(error => {
        console.warn('Error Fetching Rules: ' + error);
        this.setState({
          LoadingComplete: true,
          RuleList: [],
          Errored: true,
        })
    });
  }

  render() {
    return (
      <FlatList
        data={this.state.RuleList}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        onRefresh={this._refresh}
        refreshing={!this.state.LoadingComplete}
        ListEmptyComponent={this.state.LoadingComplete && (this.state.Errored
          ? <ErrorPlaceholder message='Error Fetching Recording Rules' />
          : <EmptyPlaceholder message='No Recording Rules Found' />)}
      />
    );
  }

  _keyExtractor = (item, idx) => item.Id;
  _renderItem = ({item}) => ( 
      <View style={styles.view}>
        <RuleCard rule={item} screenProps={this.props.screenProps} onPress={this._onRulePressed} />
      </View>
  );

  _onRulePressed(rule) {
    requestAnimationFrame(
      () => this.props.navigation.push('RuleDetail', {'rule': rule})
    );
  }
}

const styles = StyleSheet.create({
  view: {
    marginHorizontal: 14,
    marginVertical: 7,
  },
});