import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export class EmptyPlaceholder extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.message}>{this.props.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  message: {
    flex: 1,
    textAlign: 'center',
    color: '#bbbbbb',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
});