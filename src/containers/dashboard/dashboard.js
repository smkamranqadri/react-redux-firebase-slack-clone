import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { bindActionCreators } from 'redux';
import { Panel } from 'react-bootstrap';

const reactjsAdminlte = require('adminlte-reactjs')
const ChatBox = reactjsAdminlte.ChatBox;
const Conversations = reactjsAdminlte.Conversations;
const Contacts = reactjsAdminlte.Contacts;

import './dashboard.css';

import { AddChannelModal } from '../addChannel/addChannel';
import { addChannel, activateChannel, sendMessage } from './dashboard.actions';

export class DashboardContainer extends Component {

  constructor(props) {
      super(props);
      this.state = { showAddChannel: false };
  }

  newChannel() {
      this.setState({ showAddChannel: true });
  }

  closeChannel = (e) => {
      this.setState({ showAddChannel: false });
  };

  addChannel = (e) => {
    this.props.addChannel(e.channelName);
  };

  truncate(string) {
    if (string && string.length > 15) {
      return string.substr(0, 15) + '...';
    } else {
      return string
    }
  }

  render() {
    const addButton = function(title, addButtonHandler) {
      return (<div className="addButton">
        <span>{title}</span>
        <i className="fa fa-plus" onClick={addButtonHandler}></i>
      </div>)
    }
    const channelList = !isLoaded(this.props.channels)
      ? 'Loading'
      : isEmpty(this.props.channels)
        ? 'Channel list is empty'
        : Object.keys(this.props.channels).map(
          (key, id) => (
              <p key={id} onClick={() => this.props.activateChannel({ channelName: key, owner: this.props.channels[key].owner })}>{key}</p>
            )
          )
    const getUserChannel = (user) => {
      let me = this.props.user;
      let user1 = user.uid
      let user2 = me.uid
      return {
        channelName: user1 < user2 ? user1 + '_' + user2 : user2 + '_' + user1,
        owner: user1 < user2 ? user.uid : me.uid,
        user: user.email
      }
    }
    const userList = !isLoaded(this.props.users)
      ? 'Loading'
      : isEmpty(this.props.users)
        ? 'Channel list is empty'
        : Object.keys(this.props.users).map(
          (key, id) => (
            this.props.user.email === this.props.users[key].email
              ? <p key={id} onClick={() => this.props.activateChannel(getUserChannel(this.props.users[key]))}>{this.props.users[key].email} <b>(you)</b></p>
              : <p key={id} onClick={() => this.props.activateChannel(getUserChannel(this.props.users[key]))}>{this.props.users[key].email}</p>
            )
          )

    return (
      <div className="row">
        <AddChannelModal show={this.state.showAddChannel} onAdd={this.addChannel} close={this.closeChannel} />
        <div className="col-sm-3 sidenav">
          <div className="title">
            <img src={this.props.user.photoURL} alt="User Image"/>
            <small>{this.props.user.displayName}</small>
          </div>
          <Panel header={addButton('CHANNELS', () => this.newChannel())} bsStyle="info">
            {channelList}
          </Panel>
          <Panel header={'DIRECT MESSAGE'} bsStyle="info">
            {userList}
          </Panel>
        </div>
        <div className="col-sm-9 nopadding chatbox">
          <ChatBox className="nopadding" width='12' buttonTheme='btn-primary' chatTheme='direct-chat-primary' headerTheme='box-primary' notificationTheme='bg-light-blue' title={this.props.activeChannel.user ||this.props.activeChannel.channelName} notifications='2' sendMessage={this.props.sendMessage} >
            <Conversations conversations={this.props.activeConversations} />
          </ChatBox>
        </div>
      </div>
    );
  }
}

DashboardContainer.propTypes = {
  user: PropTypes.object.isRequired,
  activeChannel: PropTypes.object.isRequired,
  addChannel: PropTypes.func.isRequired,
  activateChannel: PropTypes.func.isRequired
};

DashboardContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

let getUser = state => state.login.user;
let getActiveChannel = state => state.dashboard.activeChannel;
let getActiveConversations = state => state.dashboard.activeConversations;

const mapStateToProps = (state, firebase) => {
    return {
      user: getUser(state),
      activeChannel: getActiveChannel(state),
      activeConversations: getActiveConversations(state),
      channels: dataToJS(state.firebase, 'channels'),
      users: dataToJS(state.firebase, 'users'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addChannel, activateChannel, sendMessage }, dispatch)
};

const wrappedDashboardContainer = firebaseConnect([
  '/channels',
  '/users'
])(DashboardContainer)

export let Dashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(wrappedDashboardContainer);
