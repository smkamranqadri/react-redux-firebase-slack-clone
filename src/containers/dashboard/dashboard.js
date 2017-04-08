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
import { addChannel, activateChannel } from './dashboard.actions';

export class DashboardContainer extends Component {

  constructor(props) {
      super(props);
      this.state = { showAddChannel: false };
  };

  componentWillReceiveProps(nextProps) {
    console.log('nextprops', nextProps);
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
    var conversationsInfo = [{
        name: 'Alexander Pierce',
        displayPicture: '../dist/img/user1-128x128.jpg',
        date: '23 Jan 2:00 pm',
        message: "Is this template really for free? That's unbelievable!"
    }, {
        align: 'right',
        name: 'Sarah Bullock',
        displayPicture: '../dist/img/user3-128x128.jpg',
        date: '23 Jan 2:05 pm',
        message: 'You better believe it!'
    }];

    var contactsInfo = [{
        name: 'Count Dracula',
        displayPicture: '../dist/img/user1-128x128.jpg',
        link: '#',
        date: '2/28/2015',
        message: 'How have you been? I was...'
    }, {
        name: 'Count Dracula',
        displayPicture: '../dist/img/user1-128x128.jpg',
        link: '#',
        date: '2/28/2015',
        message: 'How have you been? I was...'
    }];
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
              <p key={id} onClick={() => this.props.activateChannel(key)}>{key}</p>
            )
          )
    const userList = !isLoaded(this.props.users)
      ? 'Loading'
      : isEmpty(this.props.users)
        ? 'Channel list is empty'
        : Object.keys(this.props.users).map(
          (key, id) => (
            this.props.user.email === this.props.users[key].email
              ? <p key={id} onClick={() => this.props.activateChannel(this.props.users[key].email)}>{this.props.users[key].email} <b>(you)</b></p>
              : <p key={id} onClick={() => this.props.activateChannel(this.props.users[key].email)}>{this.props.users[key].email}</p>
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
          <ChatBox className="nopadding" width='12' buttonTheme='btn-primary' chatTheme='direct-chat-primary' headerTheme='box-primary' notificationTheme='bg-light-blue' title={this.props.activeChannel} notifications='2' sendMessage={this.sendMessage} >
            <Conversations conversations={conversationsInfo} />
            <Contacts contacts={contactsInfo} />
          </ChatBox>
        </div>
      </div>
    );
  }
}

DashboardContainer.propTypes = {
  user: PropTypes.object.isRequired,
  activeChannel: PropTypes.string.isRequired,
  addChannel: PropTypes.func.isRequired,
  activateChannel: PropTypes.func.isRequired
};

DashboardContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

let getUser = state => state.login.user;
let getActiveChannel = state => state.dashboard.activeChannel;

const mapStateToProps = (state, firebase) => {
    return {
      user: getUser(state),
      activeChannel: getActiveChannel(state),
      channels: dataToJS(state.firebase, 'channels'),
      users: dataToJS(state.firebase, 'users'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addChannel, activateChannel }, dispatch)
};

const wrappedDashboardContainer = firebaseConnect([
  '/channels',
  '/users'
])(DashboardContainer)

export let Dashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(wrappedDashboardContainer);
