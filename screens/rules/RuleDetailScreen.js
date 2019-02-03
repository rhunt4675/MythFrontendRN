import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class RuleDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Edit Rule: ' + navigation.getParam('rule', {Title: '[Rule]'}).Title,
  });
  
  constructor(props) {
    super(props);
  };

  render() {
    const rule = this.props.navigation.getParam('rule');

    return (
      <ScrollView style={styles.flex}>
        <Text>{JSON.stringify(rule)}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});