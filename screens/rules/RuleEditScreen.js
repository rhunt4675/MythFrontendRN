import * as React from 'react';
import Dimensions from '../../constants/Layout';
import { 
  RecTypes,
  DupMethods,
  DupIn,
} from '../../constants/MythTV';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Button,
  Checkbox,
  Headline,
  List,
  Modal,
  Portal,
  RadioButton,
  Switch,
  Title,
} from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

export default class RuleEditScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit Recording Rule',
  };

  constructor(props) {
    super(props);

    this.state = {
      rule: this.props.navigation.getParam('rule'),
      modal: null,
    };

    this._openRadioButtonModal = this._openRadioButtonModal.bind(this);
    this._closeRadioButtonModal = this._closeRadioButtonModal.bind(this);
    this._updateRule = this._updateRule.bind(this);
  };

  _jsonIdx(obj, path) {
    return path.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, obj);
  }

  _openRadioButtonModal(title, items, jsonPath) {
    this.setState({
      modal: {
        title: title,
        items: items,
        jsonPath: jsonPath,
      },
    });
  }

  _closeRadioButtonModal() {
    this.setState({
      modal: null,
    });
  }

  _updateRule(path, newValue) {
    this.setState((state, props) => {
      let newRule = {...state.rule};
      [childPath, ...parentPath] = path.reverse();
      var parent = this._jsonIdx(newRule, parentPath.reverse());
      parent[childPath] = newValue;

      return {rule: newRule};
    });
  }

  render() {
    const rule = this.state.rule;

    const modalChange = selectedItem => {this._updateRule(this.state.modal.jsonPath, selectedItem); this._closeRadioButtonModal()};
    const modalValue = this.state.modal && this._jsonIdx(rule, this.state.modal.jsonPath);
    let modal = this.state.modal &&
      <Portal>
        <Modal visible onDismiss={this._closeRadioButtonModal}>
          <View style={styles.modal}>
            <Title>{this.state.modal.title}</Title>
            <RadioButton.Group onValueChange={modalChange} value={modalValue}>
              {this.state.modal.items.map(item => <View>
                                                    <RadioButton value={item} />
                                                    <Text>{item}</Text>
                                                  </View>)}
            </RadioButton.Group>
          </View>
        </Modal>
      </Portal>;

    return (
      <ScrollView>
        {modal}
        <View style={styles.divider} />
        <View>
          <List.Section>
            <List.Subheader>General</List.Subheader>
            <List.Item title='Enabled'
                       style={styles.listItem}
                       onPress={() => this._updateRule(['Inactive'], rule.Inactive === 'false' ? 'true' : 'false')}
                       right={props => <Checkbox status={rule.Inactive === 'false' ? 'checked' : 'unchecked'} />} />
            <List.Item title='Record Type'
                       description={rule.Type}
                       onPress={() => this._openRadioButtonModal('Record Type', RecTypes, ['Type'])}
                       style={styles.listItem} />
            <List.Item title='Duplication Method'
                       style={styles.listItem}
                       onPress={() => this._openRadioButtonModal('Duplication Method', DupMethods, ['DupMethod'])}
                       description={rule.DupMethod} />
            <List.Item title='Check Duplication In'
                       style={styles.listItem}
                       onPress={() => this._openRadioButtonModal('Check Duplication In', DupIn, ['DupIn'])}
                       description={rule.DupIn} />
          </List.Section>
        </View>
        <View style={styles.divider} />
        <List.Section>
          <List.Subheader>Timing</List.Subheader>
          <List.Item title='Start Offset'
                     style={styles.listItem}
                     right={props =>  <View style={styles.rowGroup}>
                                        <Button compact mode='outlined'><AntDesign size={15} name='plus' /></Button>
                                        <Text style={styles.incDecTextSpacer}>{rule.StartOffset}</Text>
                                        <Button compact mode='outlined'><AntDesign size={15} name='minus' /></Button>
                                      </View>} />
          <List.Item title='End Offset'
                     style={styles.listItem}
                     right={props =>  <View style={styles.rowGroup}>
                                        <Button compact mode='outlined'><AntDesign size={15} name='plus' /></Button>
                                        <Text style={styles.incDecTextSpacer}>{rule.EndOffset}</Text>
                                        <Button compact mode='outlined'><AntDesign size={15} name='minus' /></Button>
                                      </View>} />
        </List.Section>
        <View style={styles.divider} />
        <List.Section>
          <List.Subheader>Expiration</List.Subheader>
          <List.Item title='Auto-Expire Recordings'
                     style={styles.listItem}
                     right={props => <Checkbox status={rule.AutoExpire === 'true' ? 'checked' : 'unchecked'} />} />
          <List.Item title='Expire Oldest First'
                     style={styles.listItem}
                     right={props => <Checkbox disabled={rule.AutoExpire === 'false'} status={rule.MaxNewest === 'true' ? 'checked' : 'unchecked'} />} />
          <List.Item title='Max Episodes'
                     style={styles.listItem}
                     right={props =>  <View style={styles.rowGroup}>
                                        <Button compact disabled={rule.AutoExpire === 'false'} mode='contained'><AntDesign size={15} name='plus' /></Button>
                                        <Text style={styles.incDecTextSpacer}>{rule.MaxEpisodes}</Text>
                                        <Button compact disabled={rule.AutoExpire === 'false'} mode='contained'><AntDesign size={15} name='minus' /></Button>
                                      </View>} />
        </List.Section>
        <View style={styles.divider} />
        <List.Section>
          <List.Subheader>Post Processing</List.Subheader>
          <List.Item title='Auto-Commercial Flag'
                     style={styles.listItem}
                     right={props => <Checkbox status={rule.AutoCommflag === 'true' ? 'checked' : 'unchecked'} />} />
          <List.Item title='Auto-Transcode'
                     style={styles.listItem}
                     right={props => <Checkbox status={rule.AutoTranscode === 'true' ? 'checked' : 'unchecked'} />} />
          <List.Item title='Auto-Metadata Lookup'
                     style={styles.listItem}
                     right={props => <Checkbox status={rule.AutoMetaLookup === 'true' ? 'checked' : 'unchecked'} />} />
          <List.Item title='Run User Job #1'
                     style={styles.listItem}
                     right={props => <Checkbox status={rule.AutoUserJob1 === 'true' ? 'checked' : 'unchecked'} />} />
          <List.Item title='Run User Job #2'
                     style={styles.listItem}
                     right={props => <Checkbox status={rule.AutoUserJob2 === 'true' ? 'checked' : 'unchecked'} />} />
          <List.Item title='Run User Job #3'
                     style={styles.listItem}
                     right={props => <Checkbox status={rule.AutoUserJob3 === 'true' ? 'checked' : 'unchecked'} />} />
          <List.Item title='Run User Job #4'
                     style={styles.listItem}
                     right={props => <Checkbox status={rule.AutoUserJob4 === 'true' ? 'checked' : 'unchecked'} />} />
        </List.Section>
        <View style={styles.divider} />
        <List.Accordion title='JSON' style={styles.accordion}>
          <Text>{JSON.stringify(rule)}</Text>
        </List.Accordion>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    marginStart: 15,
  },
  divider: {
    backgroundColor: '#f7f7f7',
    width: '100%',
    height: 1,
  },
  rowGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  incDecTextSpacer: {
    paddingHorizontal: 10,
  },
  modal: {
    marginHorizontal: 50,
    backgroundColor: 'white',
  },
});