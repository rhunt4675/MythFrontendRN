import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { UpcomingCard } from '../../components/upcoming/UpcomingCard';
import { EmptyPlaceholder } from '../../components/EmptyPlaceholder';
import { ErrorPlaceholder } from '../../components/ErrorPlaceholder';

export default class UpcomingScreen extends React.Component {
  static navigationOptions = {
    title: 'Upcoming Recordings',
  };

  constructor(props) {
    super(props);
    this.state = {
      LoadingComplete: false,
      UpcomingList: [],
      Errored: false,
    };

    this._refresh = this._refresh.bind(this);
  };

  componentDidMount() {
    this._refresh();
  }

  _refresh() {
    this.setState({
      LoadingComplete: false,
      Errored: false,
    });
    this._fetchUpcomingList();
  }

  _fetchUpcomingList() {
    fetch(this.props.screenProps.backendAddr + '/Dvr/GetUpcomingList?ShowAll=true', {headers: {'Accept': 'application/json'}})
    .then(response => response.json())
    .then(response => {
      /*
      Warning: Can't call setState (or forceUpdate) on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.%s, 
    in RecordedScreen (created by SceneView)
    in SceneView (at StackViewLayout.js:782)
    in RCTView (at View.js:44)
    in RCTView (at View.js:44)
    in RCTView (at View.js:44)
    in AnimatedComponent (at StackViewCard.js:69)
    in RCTView (at View.js:44)
    in AnimatedComponent (at screens.native.js:59)
    in Screen (at StackViewCard.js:57)
    in Card (at createPointerEventsContainer.js:27)
    in Container (at StackViewLayout.js:858)

    Stack trace:
      node_modules/react-native/Libraries/YellowBox/YellowBox.js:59:8 in error
      node_modules/react-native/Libraries/Renderer/oss/ReactNativeRenderer-dev.js:619:8 in warningWithoutStack
      node_modules/react-native/Libraries/Renderer/oss/ReactNativeRenderer-dev.js:13205:6 in warnAboutUpdateOnUnmounted
      node_modules/react-native/Libraries/Renderer/oss/ReactNativeRenderer-dev.js:14683:33 in scheduleWork
      node_modules/react-native/Libraries/Renderer/oss/ReactNativeRenderer-dev.js:7700:17 in enqueueSetState
      node_modules/react/cjs/react.development.js:364:31 in setState
      screens/RecordedScreen.js:46:20 in <unknown>
      node_modules/promise/setimmediate/core.js:37:14 in tryCallOne
      node_modules/promise/setimmediate/core.js:123:25 in <unknown>
      ...

      */
      this.setState({
        LoadingComplete: true,
        UpcomingList: response.ProgramList.Programs,
        Errored: false,
      });
    })
    .catch(error => {
      console.warn('Error Fetching Upcoming Programs: ' + error);
      this.setState({
        LoadingComplete: true,
        UpcomingList: [],
        Errored: true,
      });
    });
  }

  render() {
    return (
      <FlatList
        data={this.state.UpcomingList}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        onRefresh={this._refresh}
        refreshing={!this.state.LoadingComplete}
        bounces={false}
        ListEmptyComponent={this.state.LoadingComplete && (this.state.Errored
          ? <ErrorPlaceholder message='Error Fetching Upcoming Recordings' />
          : <EmptyPlaceholder message='No Upcoming Recordings Found' />)}
      />
    );
  }

  _keyExtractor = (item, idx) => item.StartTime + item.Channel.ChanId;
  _renderItem = ({item}) => (
    <View style={styles.wrapper}>
      <UpcomingCard upcoming={item} screenProps={this.props.screenProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 5,
    marginRight: 15,
  },
});