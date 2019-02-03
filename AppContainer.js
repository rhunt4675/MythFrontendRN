import React from 'react';
import { 
  createAppContainer, 
  createSwitchNavigator,
  createStackNavigator, 
  createBottomTabNavigator,
} from 'react-navigation';
import Settings from './storage/Settings';

import TitleScreen from './screens/recordings/TitleScreen';
import RecordedScreen from './screens/recordings/RecordedScreen';
import RecordedDetailScreen from './screens/recordings/RecordedDetailScreen';
import RecentScreen from './screens/recent/RecentScreen';
import UpcomingScreen from './screens/upcoming/UpcomingScreen';
import StatusScreen from './screens/status/StatusScreen';
import RuleScreen from './screens/rules/RuleScreen';
import RuleDetailScreen from './screens/rules/RuleDetailScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backendAddr: undefined,
    }

    this._loadBackendAddr();
    this._onBackendAddrChanged = this._onBackendAddrChanged.bind(this);
  }

  _loadBackendAddr() {
    Settings.getBackendAddr()
      .then(addr => this.setState({
        backendAddr: addr,
      })
    );
  }

  _onBackendAddrChanged(newAddr) {
    Settings.setBackendAddr(newAddr)
      .then(() => this.setState({
        backendAddr: newAddr,
      })
    );
  }

  render() {
    const RecordingStack = createStackNavigator({
      Title: TitleScreen,
      Recorded: RecordedScreen,
      Detail: RecordedDetailScreen,
    });
    
    const RecentStack = createStackNavigator({
      Recent: RecentScreen,
      Detail: RecordedDetailScreen,
    });

    const UpcomingStack = createStackNavigator({
      Upcoming: UpcomingScreen,
    });

    const RuleStack = createStackNavigator({
      Rule: RuleScreen,
      RuleDetail: RuleDetailScreen,
    });

    const StatusStack = createStackNavigator({
      Status: StatusScreen,
    });
    
    const SettingsStack = createStackNavigator({
      Settings: {
        screen: props => <SettingsScreen {...props} onBackendAddrChanged={this._onBackendAddrChanged} />,
        navigationOptions: {title: 'Settings'},
      },
    });

    RecordingStack.navigationOptions = {tabBarLabel: 'Recordings'};
    RecentStack.navigationOptions = {tabBarLabel: 'Recent'};
    UpcomingStack.navigationOptions = {tabBarLabel: 'Upcoming'};
    RuleStack.navigationOptions = {tabBarLabel: 'Rules'};
    StatusStack.navigationOptions = {tabBarLabel: 'Status'};
    SettingsStack.navigationOptions = {tabBarLabel: 'Settings'};

    const TabNavigator = createBottomTabNavigator({RecordingStack, RecentStack, UpcomingStack, RuleStack, StatusStack, SettingsStack});
    const AppContainer = createAppContainer(TabNavigator);

    return <AppContainer screenProps={{...this.state}} />;
  }
}