import React, { createContext, useState, useRef, useContext, useEffect, Component } from 'react';
import _$1 from 'lodash';
import { ChatEngineContext as ChatEngineContext$1, getLatestChats as getLatestChats$1, getLatestMessages as getLatestMessages$1, readMessage as readMessage$1, getChat as getChat$1, TextInput as TextInput$1, Button as Button$1, newChat as newChat$1, getChatsBefore as getChatsBefore$1, Avatar as Avatar$1, removePerson as removePerson$1, AutoCompleteInput as AutoCompleteInput$1, addPerson as addPerson$1, getOtherPeople as getOtherPeople$1, deleteChat as deleteChat$1, editChat as editChat$1, Dot as Dot$1, isTyping as isTyping$1, sendMessage as sendMessage$1 } from 'nextjs-chat-engine';
import { WebSocket } from 'nextjs-websocket';
import axios from 'axios';
import { LoadingOutlined, CloseOutlined, MenuOutlined, LeftOutlined, SettingOutlined, FileOutlined, CloseCircleTwoTone, PaperClipOutlined, ArrowUpOutlined, SyncOutlined, CaretDownOutlined, PlusOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import { useSpring, animated } from 'react-spring';
import { setConfiguration, Row, Col } from 'react-grid-system';
import { animateScroll } from 'react-scroll';

var ChatEngineContext = createContext();
var ChatEngineWrapper = function ChatEngineWrapper(props) {
  var _useState = useState(true),
    connecting = _useState[0],
    setConnecting = _useState[1];
  var _useState2 = useState(null),
    conn = _useState2[0],
    setConn = _useState2[1];
  var _useState3 = useState(null),
    creds = _useState3[0],
    setCreds = _useState3[1];
  var _useState4 = useState(''),
    sessionToken = _useState4[0],
    setSessionToken = _useState4[1];
  var _useState5 = useState(null),
    chats = _useState5[0],
    setChats = _useState5[1];
  var _useState6 = useState({}),
    messages = _useState6[0],
    setMessages = _useState6[1];
  var _useState7 = useState({}),
    sendingMessages = _useState7[0],
    setSendingMessages = _useState7[1];
  var _useState8 = useState(null),
    activeChat = _useState8[0],
    setActiveChat = _useState8[1];
  var _useState9 = useState({}),
    typingCounter = _useState9[0],
    setTypingCounter = _useState9[1];
  var _useState10 = useState(false),
    loadMoreMessages = _useState10[0],
    setLoadMoreMessages = _useState10[1];
  var _useState11 = useState(false),
    isBottomVisible = _useState11[0],
    setIsBottomVisible = _useState11[1];
  var value = {
    connecting: connecting,
    setConnecting: setConnecting,
    conn: conn,
    setConn: setConn,
    creds: creds,
    setCreds: setCreds,
    sessionToken: sessionToken,
    setSessionToken: setSessionToken,
    chats: chats,
    setChats: setChats,
    messages: messages,
    setMessages: setMessages,
    sendingMessages: sendingMessages,
    setSendingMessages: setSendingMessages,
    activeChat: activeChat,
    setActiveChat: setActiveChat,
    typingCounter: typingCounter,
    setTypingCounter: setTypingCounter,
    loadMoreMessages: loadMoreMessages,
    setLoadMoreMessages: setLoadMoreMessages,
    isBottomVisible: isBottomVisible,
    setIsBottomVisible: setIsBottomVisible
  };
  return /*#__PURE__*/React.createElement(ChatEngineContext.Provider, {
    value: value
  }, props.children);
};

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

function getDateTime(date, offset) {
  if (!date) return '';
  date = date.replace(' ', 'T');
  offset = offset ? offset : 0;
  var year = date.substr(0, 4);
  var month = date.substr(5, 2);
  var day = date.substr(8, 2);
  var hour = date.substr(11, 2);
  var minute = date.substr(14, 2);
  var second = date.substr(17, 2);
  var d = new Date(year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second);
  d.setHours(d.getHours() + offset);
  return d;
}
var options = {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric'
};
function formatTime(dateTime) {
  var time = dateTime.toLocaleString('en-US');
  return time.split(' ')[1].slice(0, -3) + ' ' + time.slice(-2);
}
function formatDate(dateTime) {
  return dateTime.toLocaleString('en-US', options);
}
function formatDateTime(dateTime) {
  return formatTime(dateTime) + ', ' + formatDate(dateTime);
}
function pythonFormatDate(d, offset) {
  var month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = '' + d.getFullYear(),
    hour = '' + (12 + d.getHours() - offset) % 12,
    minute = '' + d.getMinutes(),
    second = '' + d.getSeconds();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  if (hour.length < 2) hour = '0' + hour;
  if (minute.length < 2) minute = '0' + minute;
  if (second.length < 2) second = '0' + second;
  var date = [year, month, day].join('-');
  var time = hour + ":" + minute + ":" + second + ".000000+00:00";
  return date + " " + time;
}

function getApiUrl(props) {
  if (props && props.development) {
    return 'http://127.0.0.1:8000';
  }
  return 'https://api.chatengine.io';
}

function getHeaders(props) {
  if (!props) {
    return;
  } else if (props.chatID) {
    return {
      "public-key": props.publicKey ? props.publicKey : props.projectID,
      "chat-id": props.chatID,
      "access-key": props.chatAccessKey
    };
  } else {
    return {
      "Public-Key": props.publicKey ? props.publicKey : props.projectID,
      "User-Name": props.userName,
      "User-Secret": props.userPassword ? props.userPassword : props.userSecret
    };
  }
}

function getOrCreateSession(props, callback, errorFunc) {
  axios.get(getApiUrl(props) + "/users/me/session/", {
    headers: getHeaders(props)
  }).then(function (response) {
    callback && callback(response.data);
  })["catch"](function (error) {
    console.log('Get or Create Session Error', error);
    errorFunc && errorFunc(error);
  });
}

var DataLoader = function DataLoader(props) {
  var didMountRef = useRef(false);
  var _useContext = useContext(ChatEngineContext$1),
    setConn = _useContext.setConn,
    setCreds = _useContext.setCreds,
    setSessionToken = _useContext.setSessionToken,
    setChats = _useContext.setChats,
    setActiveChat = _useContext.setActiveChat,
    setMessages = _useContext.setMessages,
    setSendingMessages = _useContext.setSendingMessages;
  useEffect(function () {
    if (!didMountRef.current) {
      didMountRef.current = true;
      getSession();
      getLatestChats$1(props, 25, function (chats) {
        return onGetChats(chats);
      });
    }
  });
  function getSession() {
    getOrCreateSession(props, function (data) {
      setConn(props);
      setCreds(props);
      setSessionToken(data.token);
    }, function (e) {
      if (e.response && e.response.status === 403) {
        console.log("Your login credentials were not correct: \n\n                        Project ID: " + props.projectID + " \n\n                        Username: " + props.userName + " \n\n                        User Secret: " + props.userSecret + "\n\n                        Double check these credentials to make sure they're correct.\n\n                        If all three are correct, try resetting the username and secret in the Online Dashboard or Private API.");
        setConn(undefined);
        setCreds(undefined);
        props.onFailAuth && props.onFailAuth(props);
      }
      setTimeout(function () {
        return getSession();
      }, 3000);
    });
  }
  function sortChats(chats) {
    return Object.values(chats).sort(function (a, b) {
      var aDate = a.last_message.created ? getDateTime(a.last_message.created, props.offset) : getDateTime(a.created, props.offset);
      var bDate = b.last_message.created ? getDateTime(b.last_message.created, props.offset) : getDateTime(b.created, props.offset);
      return new Date(bDate) - new Date(aDate);
    });
  }
  function onGetChats(chats) {
    var sortedChats = sortChats(chats);
    var activeChatID = sortedChats[0] ? parseInt(sortedChats[0].id) : 0;
    setChats(_.mapKeys(chats, 'id'));
    setActiveChat(activeChatID);
    getLatestMessages$1(props, activeChatID, 45, function (id, list) {
      setSendingMessages({});
      setMessages(_.mapKeys(list, 'id'));
    });
  }
  return /*#__PURE__*/React.createElement("div", null);
};

var _this = undefined;
var socketRef = undefined;
var pingIntervalID = 0;
var timeIntervalID = 0;
var pingInterval = 4000;
var minSocketLag = 15 * 1000;
var reconnect = Date.now() + 10 * 1000;
var Socket = function Socket(props) {
  var handleEvent = function handleEvent(event) {
    try {
      var eventJSON = JSON.parse(event);
      if (eventJSON.action === 'pong') {
        setShouldPongBy(Date.now() + minSocketLag);
      } else if (eventJSON.action === 'new_chat') {
        var chat = eventJSON.data;
        if (chats) {
          var newChats = _extends({}, chats);
          newChats[chat.id] = chat;
          setChats(newChats);
          setActiveChat(chat.id);
        }
        props.onNewChat && props.onNewChat(eventJSON.data);
      } else if (eventJSON.action === 'edit_chat') {
        handleEditChat(eventJSON.data);
      } else if (eventJSON.action === 'delete_chat') {
        var _chat = eventJSON.data;
        if (chats) {
          chats[_chat.id] = undefined;
          setChats(chats);
          if (!_.isEmpty(chats)) {
            var sortedChats = sortChats(chats);
            setActiveChat(sortedChats[0] ? parseInt(sortedChats[0].id) : 0);
          }
        }
        props.onDeleteChat && props.onDeleteChat(_chat);
      } else if (eventJSON.action === 'add_person') {
        handleEditChat(eventJSON.data);
        props.onAddPerson && props.onAddPerson(eventJSON.data);
      } else if (eventJSON.action === 'remove_person') {
        handleEditChat(eventJSON.data);
        props.onRemovePerson && props.onRemovePerson(eventJSON.data);
      } else if (eventJSON.action === 'new_message') {
        var _eventJSON$data = eventJSON.data,
          id = _eventJSON$data.id,
          message = _eventJSON$data.message;
        if (typeof message.custom_json === "string" && message.custom_json.indexOf('sender_id') !== -1) {
          sendingMessages[JSON.parse(message.custom_json).sender_id] = undefined;
          setSendingMessages(sendingMessages);
        }
        if (parseInt(id) === parseInt(activeChat)) {
          var newMessages = _extends({}, messages);
          newMessages[message.id] = message;
          setMessages(newMessages);
        }
        if (message.sender_username !== props.userName && isBottomVisible) {
          readMessage$1(conn, activeChat, message.id, function (chat) {
            return handleEditChat(chat);
          });
        }
        props.onNewMessage && props.onNewMessage(id, message);
      } else if (eventJSON.action === 'edit_message') {
        var _eventJSON$data2 = eventJSON.data,
          _id = _eventJSON$data2.id,
          _message = _eventJSON$data2.message;
        if (_id === activeChat) {
          messages[_message.id] = _message;
          setMessages(messages);
        }
        props.onEditMessage && props.onEditMessage(_id, _message);
      } else if (eventJSON.action === 'delete_message') {
        var _eventJSON$data3 = eventJSON.data,
          _id2 = _eventJSON$data3.id,
          _message2 = _eventJSON$data3.message;
        if (_id2 === activeChat) {
          messages[_message2.id] = undefined;
          setMessages(messages);
        }
        props.onDeleteMessage && props.onDeleteMessage(_id2, _message2);
      } else if (eventJSON.action === 'is_typing') {
        var _extends2, _extends3;
        var _eventJSON$data4 = eventJSON.data,
          _id3 = _eventJSON$data4.id,
          person = _eventJSON$data4.person;
        var newTypingCounter = _extends({}, typingCounter);
        newTypingCounter = _extends({}, newTypingCounter, (_extends3 = {}, _extends3[_id3] = _extends({}, newTypingCounter[_id3], (_extends2 = {}, _extends2[person] = Date.now(), _extends2)), _extends3));
        setTypingCounter(newTypingCounter);
        props.onTyping && props.onTyping(_id3, person);
      }
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var didMountRef = useRef(false);
  var _useState = useState(Date.now()),
    now = _useState[0],
    setNow = _useState[1];
  var _useState2 = useState(Date.now() + minSocketLag),
    shouldPongBy = _useState2[0],
    setShouldPongBy = _useState2[1];
  var _useContext = useContext(ChatEngineContext$1),
    connecting = _useContext.connecting,
    setConnecting = _useContext.setConnecting,
    conn = _useContext.conn,
    sessionToken = _useContext.sessionToken,
    chats = _useContext.chats,
    setChats = _useContext.setChats,
    messages = _useContext.messages,
    setMessages = _useContext.setMessages,
    sendingMessages = _useContext.sendingMessages,
    setSendingMessages = _useContext.setSendingMessages,
    activeChat = _useContext.activeChat,
    setActiveChat = _useContext.setActiveChat,
    typingCounter = _useContext.typingCounter,
    setTypingCounter = _useContext.setTypingCounter,
    isBottomVisible = _useContext.isBottomVisible;
  useEffect(function () {
    if (!didMountRef.current) {
      didMountRef.current = true;
    } else if (didMountRef.current && connecting) {
      props.reRender && props.reRender();
    }
  }, [connecting]);
  useEffect(function () {
    if (shouldPongBy < now) {
      setConnecting(true);
      setShouldPongBy(Date.now() + minSocketLag);
    }
  }, [now, shouldPongBy]);
  useEffect(function () {
    return function () {
      clearInterval(pingIntervalID);
      clearInterval(timeIntervalID);
    };
  }, []);
  function sortChats(chats) {
    return Object.values(chats).sort(function (a, b) {
      var aDate = a.last_message.created ? getDateTime(a.last_message.created, props.offset) : getDateTime(a.created, props.offset);
      var bDate = b.last_message.created ? getDateTime(b.last_message.created, props.offset) : getDateTime(b.created, props.offset);
      return new Date(bDate) - new Date(aDate);
    });
  }
  function onConnect(conn) {
    setConnecting(false);
    if (connecting) {
      pingIntervalID = setInterval(function () {
        try {
          socketRef.sendMessage(JSON.stringify('ping'));
        } catch (e) {
          console.log('Socker error', e);
        }
      }, pingInterval);
      timeIntervalID = setInterval(function () {
        return setNow(Date.now());
      }, 1000);
    }
    getLatestChats$1(conn, 25, function (chats) {
      return setChats(_.mapKeys(chats, 'id'));
    });
    if (Date.now() > reconnect || conn.renderChatFeed) {
      getLatestMessages$1(conn, activeChat, 45, function (id, list) {
        setSendingMessages({});
        setMessages(_extends({}, messages, _.mapKeys(list, 'id')));
      });
    }
    props.onConnect && props.onConnect(conn);
  }
  function handleEditChat(chat) {
    if (chats) {
      var newChats = _extends({}, chats);
      newChats[chat.id] = chat;
      setChats(newChats);
    }
    props.onEditChat && props.onEditChat(chat);
  }
  var development = props.development;
  var wsStart = development ? 'ws://' : 'wss://';
  var rootHost = development ? '127.0.0.1:8000' : 'api.chatengine.io';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DataLoader, props), sessionToken !== '' && /*#__PURE__*/React.createElement(WebSocket, {
    reconnect: true,
    childRef: function childRef(ref) {
      return socketRef = ref;
    },
    url: "" + wsStart + rootHost + "/person_v4/?session_token=" + sessionToken,
    onOpen: onConnect.bind(_this, props),
    onClose: function onClose() {
      return setConnecting(true);
    },
    onMessage: handleEvent.bind(_this),
    reconnectIntervalInMilliSeconds: 3000
  }));
};

var Socket$1 = function Socket$1(props) {
  var _useState = useState(false),
    hide = _useState[0],
    setHide = _useState[1];
  function _reRender() {
    setHide(true);
    setTimeout(function () {
      setHide(false);
    }, 100);
  }
  if (hide) {
    return /*#__PURE__*/React.createElement("div", null);
  } else {
    return /*#__PURE__*/React.createElement(Socket, _extends({}, props, {
      reRender: function reRender() {
        return _reRender();
      }
    }));
  }
};

var _this$1 = undefined;
var socketRef$1 = undefined;
var pingIntervalID$1 = 0;
var timeIntervalID$1 = 0;
var pingInterval$1 = 4000;
var minSocketLag$1 = 15 * 1000;
var reconnect$1 = Date.now() + 10 * 1000;
var SocketChild = function SocketChild(props) {
  var didMountRef = useRef(false);
  var _useState = useState('');
  var _useState2 = useState(Date.now()),
    now = _useState2[0],
    setNow = _useState2[1];
  var _useState3 = useState(Date.now() + minSocketLag$1),
    shouldPongBy = _useState3[0],
    setShouldPongBy = _useState3[1];
  var _useContext = useContext(ChatEngineContext$1),
    connecting = _useContext.connecting,
    setConnecting = _useContext.setConnecting,
    conn = _useContext.conn,
    setConn = _useContext.setConn,
    setCreds = _useContext.setCreds,
    chats = _useContext.chats,
    setChats = _useContext.setChats,
    messages = _useContext.messages,
    setMessages = _useContext.setMessages,
    sendingMessages = _useContext.sendingMessages,
    setSendingMessages = _useContext.setSendingMessages,
    activeChat = _useContext.activeChat,
    setActiveChat = _useContext.setActiveChat,
    typingCounter = _useContext.typingCounter,
    setTypingCounter = _useContext.setTypingCounter;
  useEffect(function () {
    if (!didMountRef.current) {
      didMountRef.current = true;
    } else if (connecting) {
      props.reRender && props.reRender();
    }
  }, [connecting]);
  useEffect(function () {
    if (shouldPongBy < now) {
      setConnecting(true);
      setShouldPongBy(Date.now() + minSocketLag$1);
    }
    return function () {
      clearInterval(pingIntervalID$1);
      clearInterval(timeIntervalID$1);
    };
  }, []);
  function onEditChat(chat) {
    if (chats) {
      var newChats = _extends({}, chats);
      newChats[chat.id] = chat;
      setChats(newChats);
    }
    props.onEditChat && props.onEditChat(chat);
  }
  function onGetChat(chat) {
    if (activeChat === null) {
      setActiveChat(chat.id);
    }
    setChats(_.mapKeys([chat], 'id'));
  }
  function onConnect(conn) {
    setConn(conn);
    setCreds(conn);
    setConnecting(false);
    if (connecting) {
      pingIntervalID$1 = setInterval(function () {
        try {
          socketRef$1.sendMessage(JSON.stringify('ping'));
        } catch (e) {
          console.log('Socker error', e);
        }
      }, pingInterval$1);
      timeIntervalID$1 = setInterval(function () {
        return setNow(Date.now());
      }, 1000);
    }
    getChat$1(conn, props.chatID, function (chat) {
      return onGetChat(chat);
    });
    if (Date.now() > reconnect$1) {
      setSendingMessages({});
      getLatestMessages$1(conn, props.chatID, 45, function (id, list) {
        setMessages(_extends({}, messages, _.mapKeys(list, 'id')));
      });
    }
    props.onConnect && props.onConnect(conn);
  }
  function handleEvent(event) {
    var eventJSON = JSON.parse(event);
    if (eventJSON.action === 'pong') {
      setShouldPongBy(Date.now() + minSocketLag$1);
    } else if (eventJSON.action === 'login_error') {
      console.log("Your chat auth credentials were not correct: \n\n                Project ID: " + props.projectID + " \n\n                Chat ID: " + props.chatID + " \n\n                Access Key: " + props.chatAccessKey + "\n\n                Double check these credentials to make sure they're correct.\n\n                If all three are correct, try resetting the username and secret in the Online Dashboard or Private API.");
      setConn(undefined);
      setCreds(undefined);
      props.onFailAuth && props.onFailAuth(conn);
    } else if (eventJSON.action === 'edit_chat') {
      onEditChat(eventJSON.data);
    } else if (eventJSON.action === 'delete_chat') {
      var chat = eventJSON.data;
      if (chats) {
        chats[chat.id] = undefined;
        setChats(chats);
      }
      props.onDeleteChat && props.onDeleteChat(chat);
    } else if (eventJSON.action === 'add_person') {
      onEditChat(eventJSON.data);
      props.onAddPerson && props.onAddPerson(eventJSON.data);
    } else if (eventJSON.action === 'remove_person') {
      onEditChat(eventJSON.data);
      props.onRemovePerson && props.onRemovePerson(eventJSON.data);
    } else if (eventJSON.action === 'new_message') {
      var _eventJSON$data = eventJSON.data,
        id = _eventJSON$data.id,
        message = _eventJSON$data.message;
      if (typeof message.custom_json === "string" && message.custom_json.indexOf('sender_id') !== -1) {
        sendingMessages[JSON.parse(message.custom_json).sender_id] = undefined;
        setSendingMessages(sendingMessages);
      }
      if (id === activeChat) {
        var newMessages = _extends({}, messages);
        newMessages[message.id] = message;
        setMessages(newMessages);
      }
      props.onNewMessage && props.onNewMessage(id, message);
    } else if (eventJSON.action === 'edit_message') {
      var _eventJSON$data2 = eventJSON.data,
        _id = _eventJSON$data2.id,
        _message = _eventJSON$data2.message;
      if (_id === activeChat) {
        messages[_message.id] = _message;
        setMessages(messages);
      }
      props.onEditMessage && props.onEditMessage(_id, _message);
    } else if (eventJSON.action === 'delete_message') {
      var _eventJSON$data3 = eventJSON.data,
        _id2 = _eventJSON$data3.id,
        _message2 = _eventJSON$data3.message;
      if (_id2 === activeChat) {
        messages[_message2.id] = undefined;
        setMessages(messages);
      }
      props.onDeleteMessage && props.onDeleteMessage(_id2, _message2);
    } else if (eventJSON.action === 'is_typing') {
      var _extends2, _extends3;
      var _eventJSON$data4 = eventJSON.data,
        _id3 = _eventJSON$data4.id,
        person = _eventJSON$data4.person;
      var newTypingCounter = _extends({}, typingCounter);
      newTypingCounter = _extends({}, newTypingCounter, (_extends3 = {}, _extends3[_id3] = _extends({}, newTypingCounter[_id3], (_extends2 = {}, _extends2[person] = Date.now(), _extends2)), _extends3));
      setTypingCounter(newTypingCounter);
      props.onTyping && props.onTyping(_id3, person);
    }
  }
  function onClose() {
    setConnecting(true);
  }
  var development = props.development,
    publicKey = props.publicKey,
    projectID = props.projectID,
    chatID = props.chatID,
    chatAccessKey = props.chatAccessKey;
  var wsStart = development ? 'ws://' : 'wss://';
  var rootHost = development ? '127.0.0.1:8000' : 'api.chatengine.io';
  var project = publicKey ? publicKey : projectID;
  return /*#__PURE__*/React.createElement(WebSocket, {
    reconnect: true,
    childRef: function childRef(ref) {
      return socketRef$1 = ref;
    },
    url: "" + wsStart + rootHost + "/chat/?projectID=" + project + "&chatID=" + chatID + "&accessKey=" + chatAccessKey,
    onOpen: onConnect.bind(_this$1, props),
    onClose: onClose.bind(_this$1),
    onMessage: handleEvent.bind(_this$1),
    reconnectIntervalInMilliSeconds: 3000
  });
};

var ChatSocket = function ChatSocket(props) {
  var _useState = useState(false),
    hide = _useState[0],
    setHide = _useState[1];
  function _reRender() {
    setHide(true);
    setTimeout(function () {
      setHide(false);
    }, 100);
  }
  if (hide) {
    return /*#__PURE__*/React.createElement("div", null);
  } else {
    return /*#__PURE__*/React.createElement(SocketChild, _extends({}, props, {
      reRender: function reRender() {
        return _reRender();
      }
    }));
  }
};

var ChatLoader = function ChatLoader(props) {
  function useOnScreen(ref) {
    var _useState = useState(false),
      isIntersecting = _useState[0],
      setIntersecting = _useState[1];
    var observer = new IntersectionObserver(function (_ref) {
      var entry = _ref[0];
      setIntersecting(entry.isIntersecting);
      if (entry.isIntersecting) {
        props.onVisible();
      }
    });
    useEffect(function () {
      observer.observe(ref.current);
      return function () {
        observer.disconnect();
      };
    }, []);
    return isIntersecting;
  }
  var ref = useRef();
  var isVisible = useOnScreen(ref);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      backgroundColor: '#e2e2e2',
      margin: '4px',
      borderRadius: '4px'
    }
  }, /*#__PURE__*/React.createElement(LoadingOutlined, {
    style: {
      fontSize: '21px',
      padding: '24px'
    }
  })));
};

var _this$2 = undefined;
var NewChatForm = function NewChatForm(props) {
  var _useContext = useContext(ChatEngineContext),
    conn = _useContext.conn;
  var _useState = useState(''),
    value = _useState[0],
    setValue = _useState[1];
  var _useState2 = useState(false),
    selected = _useState2[0],
    setSelected = _useState2[1];
  function _handleChange(event) {
    setValue(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (conn && value.trim().length > 0) {
      newChat$1(conn, {
        title: value
      }, function () {
        return setSelected(false);
      });
    }
    setValue('');
  }
  return /*#__PURE__*/React.createElement("div", null, props.onClose && /*#__PURE__*/React.createElement("div", {
    style: {
      height: '0px'
    }
  }, /*#__PURE__*/React.createElement(CloseOutlined, {
    style: styles.closeIcon,
    onClick: function onClick() {
      return props.onClose();
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "ce-chat-form-container",
    style: _extends({}, styles.newChatContainer, {
      marginLeft: props.onClose ? '40px' : '0px'
    })
  }, selected ? /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit.bind(_this$2)
  }, /*#__PURE__*/React.createElement(TextInput$1, {
    autoFocus: true,
    label: "Chat Title",
    value: value,
    id: "ce-new-chat-title-field",
    onBlur: function onBlur() {
      return setSelected(false);
    },
    style: {
      width: '100%'
    },
    handleChange: function handleChange(e) {
      return _handleChange(e);
    }
  })) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '0px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: '600',
      fontSize: '24px',
      position: 'relative',
      top: '4px',
      width: 'calc(100% - 48px)'
    }
  }, "My Chats")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement(Button$1, {
    icon: "plus",
    id: "new-chat-plus-button",
    onClick: function onClick() {
      return setSelected(true);
    }
  })))));
};
var styles = {
  closeIcon: {
    position: 'relative',
    top: '26px',
    left: '18px',
    fontSize: '16px'
  },
  newChatContainer: {
    padding: '16px 14px',
    backgroundColor: 'white'
  }
};

var ChatCard = function ChatCard() {
  return /*#__PURE__*/React.createElement("div", {
    style: styles$1.chatContainer,
    className: "ce-chat-card ce-chat-card-loading"
  }, /*#__PURE__*/React.createElement("div", {
    style: _extends({}, styles$1.titleText, {
      animation: "spin 2s linear infinite"
    }),
    className: "ce-chat-title-text",
    id: "ce-chat-card-title-loading"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: '#e2e2e2',
      height: '16px',
      marginBottom: '8px',
      width: '100%',
      borderRadius: '4px'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%'
    },
    className: "ce-chat-subtitle"
  }, /*#__PURE__*/React.createElement("div", {
    style: styles$1.messageText,
    className: "ce-chat-subtitle-text ce-chat-subtitle-message"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: '#e2e2e2',
      height: '12px',
      width: '45%',
      borderRadius: '4px',
      display: 'inline-block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      "float": 'right',
      backgroundColor: '#e2e2e2',
      marginTop: '2px',
      height: '12px',
      width: '20%',
      borderRadius: '4px',
      display: 'inline-block'
    }
  })));
};
var styles$1 = {
  chatContainer: {
    padding: '16px',
    paddingBottom: '12px',
    cursor: 'pointer'
  },
  titleText: {
    fontWeight: '500',
    paddingBottom: '4px',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  messageText: {
    width: '75%',
    color: 'rgba(153, 153, 153, 1)',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    display: 'inline-block'
  },
  activeChat: {
    backgroundColor: '#d9d9d9',
    border: '4px solid white',
    borderRadius: '12px'
  }
};

function useBoop(_ref) {
  var _ref$x = _ref.x,
    x = _ref$x === void 0 ? 0 : _ref$x,
    _ref$y = _ref.y,
    y = _ref$y === void 0 ? 0 : _ref$y,
    _ref$rotation = _ref.rotation,
    rotation = _ref$rotation === void 0 ? 0 : _ref$rotation,
    _ref$scale = _ref.scale,
    scale = _ref$scale === void 0 ? 1 : _ref$scale,
    _ref$timing = _ref.timing,
    timing = _ref$timing === void 0 ? 150 : _ref$timing,
    _ref$springConfig = _ref.springConfig,
    springConfig = _ref$springConfig === void 0 ? {
      tension: 300,
      friction: 10
    } : _ref$springConfig,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? 'auto' : _ref$width;
  var _React$useState = React.useState(false),
    isBooped = _React$useState[0],
    setIsBooped = _React$useState[1];
  var style = useSpring({
    display: 'inline-block',
    backfaceVisibility: 'hidden',
    transform: isBooped ? "translate(" + x + "px, " + y + "px)\n            rotate(" + rotation + "deg)\n            scale(" + scale + ")" : "translate(0px, 0px)\n            rotate(0deg)\n            scale(1)",
    config: springConfig,
    width: width
  });
  React.useEffect(function () {
    if (!isBooped) {
      return;
    }
    var timeoutId = window.setTimeout(function () {
      setIsBooped(false);
    }, timing);
    return function () {
      window.clearTimeout(timeoutId);
    };
  }, [isBooped]);
  var trigger = React.useCallback(function () {
    setIsBooped(true);
  }, []);
  return [style, trigger];
}

var _excluded = ["children", "triggers"];
var Boop = function Boop(_ref) {
  var children = _ref.children,
    _ref$triggers = _ref.triggers,
    triggers = _ref$triggers === void 0 ? [] : _ref$triggers,
    boopConfig = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useBoop = useBoop(boopConfig),
    style = _useBoop[0],
    trigger = _useBoop[1];
  function isTriggerPresent(trigger) {
    return triggers.indexOf(trigger) !== -1;
  }
  return /*#__PURE__*/React.createElement(animated.span, {
    style: style,
    onClick: function onClick() {
      return isTriggerPresent('onClick') && trigger();
    },
    onMouseEnter: function onMouseEnter() {
      return isTriggerPresent('onMouseEnter') && trigger();
    },
    onMouseLeave: function onMouseLeave() {
      return isTriggerPresent('onMouseLeave') && trigger();
    }
  }, children);
};

var _require = require('html-to-text'),
  htmlToText = _require.htmlToText;
var ChatCard$1 = function ChatCard$1(props) {
  var chat = props.chat;
  var _useContext = useContext(ChatEngineContext$1),
    conn = _useContext.conn,
    activeChat = _useContext.activeChat,
    setActiveChat = _useContext.setActiveChat;
  if (_$1.isEmpty(chat) || props.loading) return /*#__PURE__*/React.createElement(ChatCard, null);
  if (!conn || conn === null) return /*#__PURE__*/React.createElement("div", null);
  var extraStyle = activeChat === chat.id ? styles$2.activeChat : {};
  var otherPerson = chat.people.find(function (person) {
    return conn.userName !== person.person.username;
  });
  var title = chat.is_direct_chat && otherPerson ? otherPerson.person.username : chat.title;
  var lastMessage = htmlToText(chat.last_message.text, {});
  if (!lastMessage) {
    lastMessage = chat.last_message.attachments.length > 0 ? chat.last_message.attachments.length + " image" + (chat.last_message.attachments.length > 1 ? 's' : '') : 'Say hello!';
  }
  function didReadLastMessage(chat) {
    var didReadLastMessage = true;
    chat.people.map(function (chat_person) {
      if (conn.userName === chat_person.person.username) {
        didReadLastMessage = chat.last_message.id === chat_person.last_read;
      }
    });
    return didReadLastMessage;
  }
  function daySinceSent(date) {
    if (!date) return '';
    return getDateTime(date, conn.offset).toString().substr(4, 6);
  }
  return /*#__PURE__*/React.createElement(Boop, {
    triggers: ['onClick', 'onMouseEnter'],
    x: 3,
    timing: 60,
    width: '-webkit-fill-available'
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return setActiveChat(chat.id);
    },
    style: _extends({}, styles$2.chatContainer, extraStyle),
    className: "ce-chat-card " + (activeChat === chat.id && 'ce-active-chat-card')
  }, /*#__PURE__*/React.createElement("div", {
    style: styles$2.titleText,
    className: "ce-chat-title-text",
    id: "ce-chat-card-title-" + title
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: !didReadLastMessage(chat) && 'calc(100% - 18px)',
      overflowX: 'hidden',
      display: 'inline-block'
    }
  }, title), !didReadLastMessage(chat) && /*#__PURE__*/React.createElement("div", {
    className: "ce-chat-unread-dot",
    style: {
      marginTop: '5px',
      width: '12px',
      height: '12px',
      borderRadius: '6px',
      backgroundColor: '#1890ff',
      "float": 'right',
      display: 'inline-block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%'
    },
    className: "ce-chat-subtitle"
  }, /*#__PURE__*/React.createElement("div", {
    style: styles$2.messageText,
    className: "ce-chat-subtitle-text ce-chat-subtitle-message"
  }, lastMessage), /*#__PURE__*/React.createElement("div", {
    className: "ce-chat-subtitle-text ce-chat-subtitle-date",
    style: _extends({}, styles$2.messageText, {
      textAlign: 'right',
      width: '25%'
    })
  }, daySinceSent(chat.last_message.created)))));
};
var styles$2 = {
  chatContainer: {
    padding: '16px',
    paddingBottom: '12px',
    cursor: 'pointer'
  },
  titleText: {
    fontWeight: '500',
    paddingBottom: '4px',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  messageText: {
    width: '75%',
    color: 'rgba(153, 153, 153, 1)',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    display: 'inline-block'
  },
  activeChat: {
    backgroundColor: '#d9d9d9',
    border: '0px solid white',
    borderRadius: '12px'
  }
};

var interval = 33;
var ChatList = function ChatList(props) {
  var didMountRef = useRef(false);
  var _useState = useState(false),
    loadChats = _useState[0],
    setLoadChats = _useState[1];
  var _useState2 = useState(true),
    hasMoreChats = _useState2[0],
    setHasMoreChats = _useState2[1];
  var _useContext = useContext(ChatEngineContext$1),
    conn = _useContext.conn,
    chats = _useContext.chats,
    setChats = _useContext.setChats,
    setActiveChat = _useContext.setActiveChat;
  var chatList = sortChats(chats ? Object.values(chats) : [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
  useEffect(function () {
    if (!didMountRef.current) {
      didMountRef.current = true;
      getLatestChats$1(props, interval, function (chats) {
        onGetChats(chats);
        chats.length > 0 && setActiveChat(chats[0].id);
      });
    }
  });
  useEffect(function () {
    if (!loadChats || loadChats === 'loading') return;
    setLoadChats('loading');
    var chatList = chats !== null ? sortChats(Object.values(chats)) : [];
    if (chatList.length > 0) {
      var before = chatList[chatList.length - 1].created;
      getChatsBefore$1(props, before, interval, function (chats) {
        return onGetChats(chats);
      });
    }
  }, [loadChats]);
  function sortChats(chats) {
    return chats.sort(function (a, b) {
      var aDate = a.last_message && a.last_message.created ? getDateTime(a.last_message.created, props.offset) : getDateTime(a.created, props.offset);
      var bDate = b.last_message && b.last_message.created ? getDateTime(b.last_message.created, props.offset) : getDateTime(b.created, props.offset);
      return new Date(bDate) - new Date(aDate);
    });
  }
  function onGetChats(chatList) {
    setLoadChats(false);
    var oldChats = chats !== null ? chats : {};
    var newChats = _$1.mapKeys(_extends({}, chatList), 'id');
    var allChats = _extends({}, oldChats, newChats);
    setChats(allChats);
    interval > chatList.length && setHasMoreChats(false);
  }
  function renderChats(chats) {
    return chats.map(function (chat, index) {
      if (!chat) {
        return /*#__PURE__*/React.createElement("div", {
          key: "chat_" + index
        });
      } else if (props.renderChatCard) {
        return /*#__PURE__*/React.createElement("div", {
          key: "chat_" + index
        }, props.renderChatCard(chat, index));
      } else {
        return /*#__PURE__*/React.createElement("div", {
          key: "chat_" + index,
          onClick: function onClick() {
            return props.onChatClick && props.onChatClick(chat.id);
          }
        }, /*#__PURE__*/React.createElement(ChatCard$1, {
          chat: chat
        }));
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: styles$3.chatListContainer,
    className: "ce-chat-list"
  }, /*#__PURE__*/React.createElement("div", {
    style: styles$3.chatsContainer,
    className: "ce-chats-container"
  }, props.renderNewChatForm ? props.renderNewChatForm(conn) : /*#__PURE__*/React.createElement(NewChatForm, {
    onClose: props.onClose ? function () {
      return props.onClose();
    } : undefined
  }), renderChats(chatList), hasMoreChats && chatList.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ChatLoader, {
    onVisible: function onVisible() {
      return !loadChats && setLoadChats(true);
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '8px'
    }
  }))));
};
var styles$3 = {
  chatListContainer: {
    height: '100%',
    maxHeight: '100vh',
    overflow: 'scroll',
    overflowX: 'hidden',
    borderRight: '1px solid #afafaf',
    backgroundColor: 'white',
    fontFamily: 'Avenir'
  },
  chatsContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: '0px 0px 24px 24px'
  }
};

var AuthFail = function AuthFail(props) {
  var project = props.projectID ? props.projectID : props.publicKey;
  return /*#__PURE__*/React.createElement("div", {
    id: "ce-login-fail-breaker",
    style: {
      width: '100%',
      textAlign: 'center',
      paddingTop: 'calc(50% - 112px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    id: "ce-login-fail-text",
    style: {
      color: '#afafaf',
      fontWeight: '600',
      fontSize: '14px',
      marginBottom: '6px',
      marginRight: '32px',
      marginLeft: '32px'
    }
  }, "Your credentials are incorrect. Make sure your Project ID, Username, and Password are correct ", /*#__PURE__*/React.createElement("a", {
    href: "https://chatengine.io/projects/" + project
  }, "here"), "."), /*#__PURE__*/React.createElement("img", {
    id: "ce-login-fail-gif",
    style: {
      width: '50%',
      maxWidth: '200px'
    },
    src: "https://chat-engine-assets.s3.amazonaws.com/welcome_gifs/no.gif",
    alt: "chat-engine-login-fail"
  }));
};

var CreateChat = function CreateChat() {
  return /*#__PURE__*/React.createElement("div", {
    id: "ce-ice-breaker",
    style: {
      width: '100%',
      textAlign: 'center',
      paddingTop: 'calc(43% - 112px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    id: "ce-ice-breaker-text",
    style: {
      color: '#afafaf',
      fontWeight: '600',
      marginBottom: '6px'
    }
  }, "Welcome!"), /*#__PURE__*/React.createElement("div", {
    id: "ce-ice-breaker-text",
    style: {
      color: '#afafaf'
    }
  }, "Create a new chat to get started."), /*#__PURE__*/React.createElement("img", {
    id: "ce-ice-breaker-gif",
    style: {
      width: '50%',
      maxWidth: '200px'
    },
    src: "https://chat-engine-assets.s3.amazonaws.com/welcome_gifs/okay.gif",
    alt: "chat-engine-ice-breaker"
  }));
};

var IceBreaker = function IceBreaker() {
  var _useContext = useContext(ChatEngineContext$1),
    activeChat = _useContext.activeChat;
  var gifs = ['https://chat-engine-assets.s3.amazonaws.com/welcome_gifs/peace.gif', 'https://chat-engine-assets.s3.amazonaws.com/welcome_gifs/thumbsup.gif'];
  var gif = gifs[(activeChat ? activeChat : 0) % gifs.length];
  return /*#__PURE__*/React.createElement("div", {
    id: "ce-ice-breaker",
    style: {
      width: '100%',
      textAlign: 'center',
      paddingTop: 'calc(43% - 112px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    id: "ce-ice-breaker-text",
    style: {
      color: '#afafaf',
      fontWeight: '600',
      fontSize: '14px',
      marginBottom: '6px'
    }
  }, "No messages here yet..."), /*#__PURE__*/React.createElement("img", {
    id: "ce-ice-breaker-gif",
    style: {
      width: '50%',
      maxWidth: '200px'
    },
    src: gif,
    alt: "chat-engine-ice-breaker"
  }));
};

var RenderTrigger = function RenderTrigger(props) {
  var _useContext = useContext(ChatEngineContext);
  function useOnScreen(ref) {
    var _useState = useState(false),
      isIntersecting = _useState[0],
      setIntersecting = _useState[1];
    var observer = new IntersectionObserver(function (_ref) {
      var entry = _ref[0];
      setIntersecting(entry.isIntersecting);
      if (entry.isIntersecting) {
        props.onEnter && props.onEnter();
      } else {
        props.onLeave && props.onLeave();
      }
    });
    useEffect(function () {
      observer.observe(ref.current);
      return function () {
        observer.disconnect();
      };
    }, []);
    return isIntersecting;
  }
  var ref = useRef();
  var isVisible = useOnScreen(ref);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref
  }, props.children);
};

var ChatListDrawer = function ChatListDrawer(props) {
  var _useState = useState(false),
    isOpen = _useState[0],
    setIsOpen = _useState[1];
  var context = useContext(ChatEngineContext);
  var propsAndContext = _extends({}, props, context);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MenuOutlined, {
    onClick: function onClick() {
      return setIsOpen(true);
    },
    style: {
      color: 'rgb(24, 144, 255)',
      outline: 'none'
    }
  }), isOpen && /*#__PURE__*/React.createElement("div", {
    style: styles$4.drawerContainer
  }, /*#__PURE__*/React.createElement(ChatList, _extends({}, propsAndContext, {
    onClose: function onClose() {
      return setIsOpen(false);
    },
    onChatClick: function onChatClick() {
      return setIsOpen(false);
    }
  }))));
};
var styles$4 = {
  drawerContainer: {
    position: 'fixed',
    zIndex: '1',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    textAlign: 'left'
  },
  titleContainer: {
    width: '100%',
    padding: '24px 0px',
    textAlign: 'center',
    color: 'rgb(24, 144, 255)'
  },
  titleText: {
    fontSize: '24px',
    fontWeight: '600'
  }
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}var AsyncMode=l;var ConcurrentMode=m;var ContextConsumer=k;var ContextProvider=h;var Element=c;var ForwardRef=n;var Fragment=e;var Lazy=t;var Memo=r;var Portal=d;
var Profiler=g;var StrictMode=f;var Suspense=p;var isAsyncMode=function(a){return A(a)||z(a)===l};var isConcurrentMode=A;var isContextConsumer=function(a){return z(a)===k};var isContextProvider=function(a){return z(a)===h};var isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};var isForwardRef=function(a){return z(a)===n};var isFragment=function(a){return z(a)===e};var isLazy=function(a){return z(a)===t};
var isMemo=function(a){return z(a)===r};var isPortal=function(a){return z(a)===d};var isProfiler=function(a){return z(a)===g};var isStrictMode=function(a){return z(a)===f};var isSuspense=function(a){return z(a)===p};
var isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};var typeOf=z;

var reactIs_production_min = {
	AsyncMode: AsyncMode,
	ConcurrentMode: ConcurrentMode,
	ContextConsumer: ContextConsumer,
	ContextProvider: ContextProvider,
	Element: Element,
	ForwardRef: ForwardRef,
	Fragment: Fragment,
	Lazy: Lazy,
	Memo: Memo,
	Portal: Portal,
	Profiler: Profiler,
	StrictMode: StrictMode,
	Suspense: Suspense,
	isAsyncMode: isAsyncMode,
	isConcurrentMode: isConcurrentMode,
	isContextConsumer: isContextConsumer,
	isContextProvider: isContextProvider,
	isElement: isElement,
	isForwardRef: isForwardRef,
	isFragment: isFragment,
	isLazy: isLazy,
	isMemo: isMemo,
	isPortal: isPortal,
	isProfiler: isProfiler,
	isStrictMode: isStrictMode,
	isSuspense: isSuspense,
	isValidElementType: isValidElementType,
	typeOf: typeOf
};

var reactIs_development = createCommonjsModule(function (module, exports) {



if (process.env.NODE_ENV !== "production") {
  (function() {

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}
});

var reactIs = createCommonjsModule(function (module) {

if (process.env.NODE_ENV === 'production') {
  module.exports = reactIs_production_min;
} else {
  module.exports = reactIs_development;
}
});

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var has = Function.call.bind(Object.prototype.hasOwnProperty);

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has$1 = has;

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes;

var printWarning$1 = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning$1 = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning$1(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!reactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning$1(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning$1('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning$1(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = reactIs;

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

var PersonRow = function PersonRow(props) {
  var _useState = useState(false),
    selected = _useState[0],
    setSelected = _useState[1];
  var person = props.person,
    chat = props.chat,
    conn = props.conn;
  if (!person || !chat) {
    return /*#__PURE__*/React.createElement("div", null);
  }
  if (!conn || conn === null) return /*#__PURE__*/React.createElement("div", null);
  function onRemovePerson() {
    removePerson$1(props.conn, props.chat.id, props.person.username);
  }
  function renderPersonText(person) {
    if (person.first_name && person.first_name !== null) {
      return "" + person.first_name + (person.last_name ? " " + person.last_name : '');
    } else {
      return person.username;
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "ce-person-container",
    onMouseEnter: function onMouseEnter() {
      return setSelected(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setSelected(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ce-person-avatar",
    style: {
      padding: '2px',
      height: '0px'
    }
  }, /*#__PURE__*/React.createElement(Avatar$1, {
    avatar: person.avatar,
    username: person.username,
    is_online: person.is_online
  })), /*#__PURE__*/React.createElement("div", {
    className: "ce-person-text",
    style: {
      paddingLeft: '52px',
      height: '44px',
      position: 'relative',
      top: '10px',
      fontSize: '15px'
    }
  }, renderPersonText(person)), selected && conn.userName === chat.admin.username && person.username !== chat.admin.username && /*#__PURE__*/React.createElement("div", {
    className: "ce-delete-chat",
    style: {
      "float": 'right',
      height: '0px',
      position: 'relative',
      bottom: '44px'
    }
  }, /*#__PURE__*/React.createElement(Button$1, {
    theme: "danger",
    icon: "delete",
    onClick: function onClick() {
      return onRemovePerson();
    }
  })));
};
PersonRow.propTypes = {
  person: propTypes.object.isRequired,
  chat: propTypes.object.isRequired,
  conn: propTypes.object
};

var PersonOption = function PersonOption(props) {
  var _useState = useState(false),
    focused = _useState[0],
    setFocused = _useState[1];
  var _props$person = props.person,
    avatar = _props$person.avatar,
    username = _props$person.username;
  return /*#__PURE__*/React.createElement("div", {
    id: "ce-username-option-" + username,
    onMouseEnter: function onMouseEnter() {
      return setFocused(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setFocused(false);
    },
    onClick: function onClick() {
      return props.onClick && props.onClick();
    },
    style: _extends({}, styles$5.option, {
      backgroundColor: focused ? '#f5f5f5' : 'white'
    })
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Avatar$1, {
    username: username,
    avatar: avatar
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      padding: '12px 4px'
    }
  }, props.person.username));
};
var styles$5 = {
  option: {
    padding: '4px 16px',
    cursor: 'pointer',
    fontSize: '15px',
    display: 'flex'
  }
};
PersonOption.propTypes = {
  person: propTypes.object.isRequired
};

var PersonForm = function PersonForm(props) {
  var _useState = useState({
      value: '',
      others: []
    }),
    state = _useState[0],
    setState = _useState[1];
  function _handleChange(value) {
    setState(_extends({}, state, {
      value: value
    }));
  }
  function invitePerson(name) {
    addPerson$1(props.conn, props.chat.id, name, function () {
      setState(_extends({}, state, {
        value: ''
      }));
      getOthers();
    });
  }
  function getOthers() {
    getOtherPeople$1(props.conn, props.chat.id, function (id, others) {
      return setState(_extends({}, state, {
        others: others
      }));
    }, function () {});
  }
  function _renderOption(option) {
    return /*#__PURE__*/React.createElement(PersonOption, {
      person: option,
      onClick: function onClick() {
        return invitePerson(option.username);
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '12px'
    }
  }, /*#__PURE__*/React.createElement(AutoCompleteInput$1, {
    style: {
      width: '100%'
    },
    label: "Type a username",
    value: state.value,
    options: state.others,
    onFocus: function onFocus() {
      return getOthers();
    },
    handleChange: function handleChange(value) {
      return _handleChange(value);
    },
    renderOption: function renderOption(option) {
      return _renderOption(option);
    }
  }));
};
PersonForm.propTypes = {
  chat: propTypes.object.isRequired,
  conn: propTypes.object.isRequired
};

var SettingsBlock = function SettingsBlock(props) {
  var _useState = useState(true),
    collapsed = _useState[0],
    setCollapsed = _useState[1];
  var _useState2 = useState(false),
    hovered = _useState2[0],
    setHovered = _useState2[1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid #f0f0f0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    id: props.id,
    className: props.className,
    onMouseEnter: function onMouseEnter() {
      return setHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHovered(false);
    },
    onClick: function onClick() {
      return setCollapsed(!collapsed);
    },
    style: {
      cursor: 'pointer',
      backgroundColor: hovered ? '#f0f0f0' : '#fff',
      transition: "background-color 100ms"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '17px',
      padding: '12px',
      fontWeight: '600'
    }
  }, props.label), /*#__PURE__*/React.createElement(LeftOutlined, {
    style: {
      "float": 'right',
      position: 'relative',
      bottom: '30px',
      right: '12px',
      transform: collapsed ? "rotate(0deg)" : "rotate(-90deg)",
      transition: "transform 100ms"
    }
  })), /*#__PURE__*/React.createElement("div", null, !collapsed && props.children));
};

var PeopleSettings = function PeopleSettings() {
  var _useContext = useContext(ChatEngineContext$1),
    conn = _useContext.conn,
    chats = _useContext.chats,
    activeChat = _useContext.activeChat;
  var chat = chats && chats[activeChat];
  if (!chat || chat.is_direct_chat) {
    return /*#__PURE__*/React.createElement("div", null);
  }
  function renderChatPeople(people, chat) {
    return people.map(function (chatPerson, index) {
      return /*#__PURE__*/React.createElement(PersonRow, {
        key: "person_" + index,
        person: chatPerson.person,
        conn: conn,
        chat: chat
      });
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid #f0f0f0'
    }
  }, /*#__PURE__*/React.createElement(SettingsBlock, {
    label: "People",
    className: "ce-section-title-container ce-person-title-container"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '12px'
    }
  }), renderChatPeople(chat.people, chat), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '12px'
    }
  }), conn && chat && conn.userName === chat.admin.username && /*#__PURE__*/React.createElement(PersonForm, {
    conn: conn,
    chat: chat
  }))));
};

var Thumbnail = function Thumbnail(props) {
  var attachment = props.attachment;
  if (!attachment) {
    return /*#__PURE__*/React.createElement("div", null);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: styles$6.container,
    className: "ce-photo-thumbnail"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: '100%'
    }
  }), /*#__PURE__*/React.createElement("img", {
    alt: attachment.id,
    style: styles$6.image,
    src: attachment.file,
    className: "ce-photo-img",
    id: "image-" + attachment.id
  }));
};
var styles$6 = {
  container: {
    position: 'relative',
    width: 'calc(33% - 8px)',
    border: '1px solid white',
    display: 'inline-block',
    cursor: 'pointer'
  },
  image: {
    top: '0px',
    width: '100%',
    height: '100%',
    position: 'absolute',
    objectFit: 'cover'
  }
};
Thumbnail.propTypes = {
  attachment: propTypes.object.isRequired
};

var PhotosSettings = function PhotosSettings() {
  var _useContext = useContext(ChatEngineContext$1),
    chats = _useContext.chats,
    activeChat = _useContext.activeChat;
  var chat = chats && chats[activeChat];
  if (!chat) return /*#__PURE__*/React.createElement("div", null);
  function renderPhotos(attachments) {
    return attachments.map(function (attachment, index) {
      return /*#__PURE__*/React.createElement(Thumbnail, {
        key: "person_" + index,
        attachment: attachment
      });
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid #f0f0f0'
    },
    className: "ce-photo-section"
  }, /*#__PURE__*/React.createElement(SettingsBlock, {
    label: "Photos",
    className: "ce-section-title-container ce-photo-title-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ce-photo-feed"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '12px'
    }
  }), renderPhotos(chat.attachments))));
};

var OptionsSettings = function OptionsSettings() {
  var _useContext = useContext(ChatEngineContext$1),
    conn = _useContext.conn,
    chats = _useContext.chats,
    activeChat = _useContext.activeChat;
  var chat = chats && chats[activeChat];
  if (!chat) return /*#__PURE__*/React.createElement("div", null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid #f0f0f0'
    }
  }, /*#__PURE__*/React.createElement(SettingsBlock, {
    id: "ce-options-drop-down",
    label: "Options"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '8px'
    }
  }), /*#__PURE__*/React.createElement(Button$1, {
    value: "Delete",
    theme: "danger",
    icon: "delete",
    id: "ce-delete-chat-button",
    onClick: function onClick() {
      return deleteChat$1(conn, chat.id, function (data) {});
    },
    style: {
      width: '100%',
      marginBottom: '12px'
    }
  }))));
};

var NewMessageForm = function NewMessageForm(props) {
  var didMountRef = useRef(false);
  var _useState = useState({
      activeChat: null,
      value: ''
    }),
    state = _useState[0],
    setState = _useState[1];
  function _handleChange(event) {
    setState(_extends({}, state, {
      value: event.target.value
    }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    editChat$1(props.conn, props.chat.id, {
      title: state.value
    }, function (data) {});
  }
  useEffect(function () {
    if (!didMountRef.current) {
      didMountRef.current = true;
    } else {
      if (state.activeChat !== props.chat.id) {
        setState(_extends({}, state, {
          value: props.chat.title,
          activeChat: props.chat.id
        }));
      }
    }
  });
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: function onSubmit(e) {
      return handleSubmit(e);
    },
    className: "ce-chat-title-form"
  }, /*#__PURE__*/React.createElement(TextInput$1, {
    label: "Rename this Chat",
    value: state.value,
    "default": props.chat.title,
    handleChange: function handleChange(e) {
      return _handleChange(e);
    },
    style: {
      fontSize: '16px',
      fontWeight: '600',
      textAlign: 'center',
      border: '0px solid white',
      width: '100%'
    }
  }));
};
NewMessageForm.propTypes = {
  chat: propTypes.object.isRequired
};

var ChatSettingsTop = function ChatSettingsTop() {
  var _useContext = useContext(ChatEngineContext$1),
    conn = _useContext.conn,
    chats = _useContext.chats,
    activeChat = _useContext.activeChat;
  var chat = chats && chats[activeChat];
  if (!chat || !conn || conn === null) return /*#__PURE__*/React.createElement("div", null);
  var topPeople = chat.people.slice(0, 3);
  var otherPerson = getOtherPerson(chat.people);
  function renderOnePerson(people) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        paddingTop: '14px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        "float": 'left',
        position: 'relative',
        left: 'calc(50% - 22px)'
      }
    }, /*#__PURE__*/React.createElement(Avatar$1, {
      show_online: false,
      username: people[0].person.username,
      avatar: people[0].person.avatar
    })));
  }
  function renderTwoPeople(people) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        paddingTop: '14px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        "float": 'left',
        position: 'relative',
        left: 'calc(50% - 22px - 15px)'
      }
    }, /*#__PURE__*/React.createElement(Avatar$1, {
      show_online: false,
      username: people[0].person.username,
      avatar: people[0].person.avatar
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        "float": 'left',
        position: 'relative',
        left: 'calc(50% - 44px - 22px + 15px)'
      }
    }, /*#__PURE__*/React.createElement(Avatar$1, {
      show_online: false,
      username: people[1].person.username,
      avatar: people[1].person.avatar
    })));
  }
  function renderThreePeople(people) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        paddingTop: '14px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        "float": 'left',
        position: 'relative',
        left: 'calc(50% - 22px - 24px)'
      }
    }, /*#__PURE__*/React.createElement(Avatar$1, {
      show_online: false,
      username: people[0].person.username,
      avatar: people[0].person.avatar
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        "float": 'left',
        position: 'relative',
        left: 'calc(50% - 24px - 44px)'
      }
    }, /*#__PURE__*/React.createElement(Avatar$1, {
      show_online: false,
      username: people[1].person.username,
      avatar: people[1].person.avatar
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        "float": 'left',
        position: 'relative',
        left: 'calc(50% - 22px - 44px - 44px + 24px)'
      }
    }, /*#__PURE__*/React.createElement(Avatar$1, {
      show_online: false,
      username: people[2].person.username,
      avatar: people[2].person.avatar
    })));
  }
  function getOtherPerson(people) {
    return people.find(function (person) {
      return person.person.username !== conn.userName;
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "ce-chat-settings-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ce-chat-avatars-row"
  }, topPeople.length === 1 && renderOnePerson(topPeople), chat.is_direct_chat && otherPerson && renderOnePerson([otherPerson]), !chat.is_direct_chat && otherPerson && topPeople.length === 2 && renderTwoPeople(topPeople), !chat.is_direct_chat && otherPerson && topPeople.length === 3 && renderThreePeople(topPeople)), chat.is_direct_chat && otherPerson ? /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: '55px',
      paddingBottom: '7px',
      fontSize: '16px',
      fontWeight: '600',
      textAlign: 'center',
      border: '0px solid white',
      width: '100%'
    }
  }, otherPerson.person.username) : /*#__PURE__*/React.createElement(NewMessageForm, {
    chat: chat,
    conn: conn
  }));
};

var ChatSettings = function ChatSettings(props) {
  var _useContext = useContext(ChatEngineContext$1),
    conn = _useContext.conn,
    chats = _useContext.chats,
    activeChat = _useContext.activeChat;
  var chat = chats && chats[activeChat];
  if (conn === null) return /*#__PURE__*/React.createElement("div", null);
  return /*#__PURE__*/React.createElement("div", {
    style: styles$7.settingsContainer,
    className: "ce-settings"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '90%',
      paddingLeft: '5%'
    },
    className: "ce-settings-container"
  }, props.renderChatSettingsTop ? props.renderChatSettingsTop(conn, chat) : /*#__PURE__*/React.createElement(ChatSettingsTop, null), props.renderPeopleSettings ? props.renderPeopleSettings(conn, chat) : /*#__PURE__*/React.createElement(PeopleSettings, null), props.renderPhotosSettings ? props.renderPhotosSettings(chat) : /*#__PURE__*/React.createElement(PhotosSettings, null), conn && chat && conn.userName === chat.admin.username && /*#__PURE__*/React.createElement("div", null, props.renderOptionsSettings ? props.renderOptionsSettings(conn, chat) : /*#__PURE__*/React.createElement(OptionsSettings, null))));
};
var styles$7 = {
  settingsContainer: {
    height: '100%',
    overflow: 'scroll',
    overflowX: 'hidden',
    borderLeft: '1px solid #afafaf',
    backgroundColor: 'white',
    fontFamily: 'Avenir'
  }
};

var ChatSettingsDrawer = function ChatSettingsDrawer(props) {
  var _useState = useState(false),
    isOpen = _useState[0],
    setIsOpen = _useState[1];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SettingOutlined, {
    onClick: function onClick() {
      return setIsOpen(true);
    },
    style: {
      color: 'rgb(24, 144, 255)',
      outline: 'none'
    }
  }), isOpen && /*#__PURE__*/React.createElement("div", {
    style: styles$8.drawerContainer
  }, /*#__PURE__*/React.createElement(CloseOutlined, {
    style: styles$8.closeIcon,
    onClick: function onClick() {
      return setIsOpen(false);
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: styles$8.titleContainer
  }, /*#__PURE__*/React.createElement("div", {
    style: styles$8.titleText
  }, "Chat Settings")), /*#__PURE__*/React.createElement(ChatSettings, props)));
};
var styles$8 = {
  drawerContainer: {
    position: 'fixed',
    zIndex: '1',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    textAlign: 'left'
  },
  closeIcon: {
    position: 'absolute',
    left: '28px',
    top: '32px'
  },
  titleContainer: {
    width: '100%',
    padding: '24px 0px',
    textAlign: 'center',
    color: 'rgb(24, 144, 255)'
  },
  titleText: {
    fontSize: '24px',
    fontWeight: '600'
  }
};

setConfiguration({
  maxScreenClass: 'xl',
  gutterWidth: 0
});
var ChatHeader = function ChatHeader() {
  var _useContext = useContext(ChatEngineContext$1),
    conn = _useContext.conn,
    chats = _useContext.chats,
    activeChat = _useContext.activeChat;
  var chat = chats ? chats[activeChat] : undefined;
  var otherPerson = chat && conn && chat.people.find(function (person) {
    return person.person.username !== conn.userName;
  });
  var title = chat ? chat.is_direct_chat && otherPerson ? otherPerson.person.username : chat.title : undefined;
  var text = 'Say hello!';
  if (!chat) {
    text = 'Loading...';
  } else if (chat.last_message.created && chat.last_message.created.length > 0) {
    var dateTime = getDateTime(chat.last_message.created, conn ? conn.offset : undefined);
    text = "Active " + formatDateTime(dateTime);
  }
  return /*#__PURE__*/React.createElement(Row, {
    className: "ce-chat-title",
    style: styles$9.titleSection
  }, /*#__PURE__*/React.createElement(Col, {
    xs: 2,
    sm: 0,
    style: _extends({}, styles$9.mobileOptiom, {
      left: '6px'
    }),
    className: "ce-chat-list-mobile-option"
  }, /*#__PURE__*/React.createElement(ChatListDrawer, null)), /*#__PURE__*/React.createElement(Col, {
    xs: 8,
    sm: 12,
    style: styles$9.titleContainer,
    className: "ce-chat-title-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: styles$9.titleText,
    className: "ce-chat-title-text",
    id: "ce-chat-feed-title-" + title
  }, title ? title : /*#__PURE__*/React.createElement(LoadingOutlined, null)), /*#__PURE__*/React.createElement("div", {
    style: styles$9.subtitleText,
    className: "ce-chat-subtitle-text"
  }, text)), /*#__PURE__*/React.createElement(Col, {
    xs: 2,
    sm: 0,
    style: _extends({}, styles$9.mobileOptiom, {
      right: '6px'
    }),
    className: "ce-chat-settings-mobile-option"
  }, /*#__PURE__*/React.createElement(ChatSettingsDrawer, null)));
};
var styles$9 = {
  titleSection: {
    position: 'absolute',
    top: '0px',
    width: '100%',
    zIndex: '1',
    backgroundColor: 'rgb(256, 256, 256, 0.92)'
  },
  mobileOptiom: {
    width: '100%',
    top: '32px',
    textAlign: 'center',
    color: 'rgb(24, 144, 255)',
    overflow: 'hidden'
  },
  titleContainer: {
    width: '100%',
    padding: '18px 0px',
    textAlign: 'center',
    color: 'rgb(24, 144, 255)',
    overflowX: 'hidden'
  },
  titleText: {
    fontSize: '24px',
    fontWeight: '600'
  },
  subtitleText: {
    fontSize: '12px'
  }
};

var DatePartition = function DatePartition(props) {
  var lastCreated = props.lastCreated,
    created = props.created;
  function getDate(date) {
    return date ? date.substr(0, 10) : null;
  }
  var lastDate = getDate(lastCreated);
  var thisDate = getDate(created);
  if (lastCreated && lastDate === thisDate) return /*#__PURE__*/React.createElement("div", null);
  return /*#__PURE__*/React.createElement("div", {
    style: styles$a.dateText,
    className: "ce-message-date-text"
  }, formatDateTime(getDateTime(created, props.offset)));
};
var styles$a = {
  dateText: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '4px',
    paddingBottom: '10px',
    fontSize: '15px',
    color: 'rgba(0, 0, 0, .40)'
  }
};

var images = ['jpg', 'jpeg', 'png', 'gif', 'tiff'];
var isImage = function isImage(fileName) {
  var dotSplit = fileName.split('.');
  return dotSplit.length > 0 && images.indexOf(dotSplit[dotSplit.length - 1].toLowerCase()) !== -1;
};
var getFileName = function getFileName(fileUrl) {
  var slashSplit = fileUrl.split('/');
  var nameAndHash = slashSplit[slashSplit.length - 1];
  return nameAndHash.split('?')[0];
};

var _loadingContainer, _thumbnail;
var Thumbnail$1 = function Thumbnail(props) {
  var _useState = useState(false),
    hovered = _useState[0],
    setHovered = _useState[1];
  var attachment = props.attachment;
  var style = _extends({}, styles$b.thumbnail, {
    border: hovered ? '1px solid #1890ff' : '1px solid #fff'
  });
  if (!attachment) {
    return /*#__PURE__*/React.createElement("div", {
      style: styles$b.loadingContainer
    }, /*#__PURE__*/React.createElement(LoadingOutlined, {
      style: {
        color: 'white',
        padding: '4px',
        fontSize: '24px'
      }
    }));
  }
  return /*#__PURE__*/React.createElement("img", {
    onClick: function onClick() {
      return window.open(attachment.file);
    },
    onMouseEnter: function onMouseEnter() {
      return setHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHovered(false);
    },
    src: attachment.file,
    alt: 'thumb-nail',
    style: style
  });
};
var styles$b = {
  loadingContainer: (_loadingContainer = {
    width: '100%',
    cursor: 'pointer',
    textAlign: 'right',
    display: 'inline-block',
    objectFit: 'cover',
    borderRadius: '0.3em',
    marginRight: '2px',
    marginBottom: '4px',
    height: '30vw'
  }, _loadingContainer["width"] = '30vw', _loadingContainer.maxHeight = '200px', _loadingContainer.maxWidth = '200px', _loadingContainer.minHeight = '100px', _loadingContainer.minWidth = '100px', _loadingContainer.backgroundColor = '#d9d9d9', _loadingContainer),
  thumbnail: (_thumbnail = {
    width: '100%',
    cursor: 'pointer',
    textAlign: 'right',
    display: 'inline',
    objectFit: 'cover',
    borderRadius: '0.3em',
    paddingRight: '2px',
    height: '30vw'
  }, _thumbnail["width"] = '30vw', _thumbnail.maxHeight = '200px', _thumbnail.maxWidth = '200px', _thumbnail.minHeight = '100px', _thumbnail.minWidth = '100px', _thumbnail)
};

var FileView = function FileView(props) {
  var _useState = useState(false),
    hovered = _useState[0],
    setHovered = _useState[1];
  var attachment = props.attachment;
  var style = _extends({}, styles$c.fileView, {
    color: hovered ? '#1890ff' : '#434343',
    border: hovered ? '1px solid #1890ff' : '1px solid #434343'
  });
  if (!attachment) {
    return /*#__PURE__*/React.createElement("div", {
      style: styles$c.loadingContainer
    }, /*#__PURE__*/React.createElement(LoadingOutlined, {
      style: {
        color: 'white',
        padding: '4px',
        fontSize: '24px'
      }
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: style,
    onMouseEnter: function onMouseEnter() {
      return setHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHovered(false);
    },
    onClick: function onClick() {
      return window.open(attachment.file);
    }
  }, /*#__PURE__*/React.createElement(FileOutlined, null), ' ', getFileName(attachment.file));
};
var styles$c = {
  loadingContainer: {
    display: 'inline-block',
    borderRadius: '14px',
    marginRight: '2px',
    height: '48px',
    width: '136px',
    marginBottom: '4px',
    marginLeft: '4px',
    backgroundColor: '#d9d9d9'
  },
  fileView: {
    padding: '12px',
    borderRadius: '14px',
    display: 'inline-block',
    marginBottom: '4px',
    marginRight: '2px',
    cursor: 'pointer'
  }
};

var colors = ['#D64045', '#5B3000', '#00CC99', '#467599', '#1D3354', '#8F250C', '#6153CC', '#961D4E', '#A29F15', '#0CAADC', '#FF5154', '#FA7921', '#688E26', '#550527', '#A10702', '#FF1053', '#6C6EA0', '#100B00'];
function stringToNumber(str) {
  var sum = 0;
  for (var i = 0; i < str.length; i++) {
    sum = sum + str.charCodeAt(i) * i - 97;
  }
  return sum;
}
function stringToColor(str) {
  if (!str) {
    return 'black';
  } else {
    return colors[stringToNumber(str) % colors.length];
  }
}

var Dot = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Dot, _Component);
  function Dot() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      avatar: ''
    };
    return _this;
  }
  var _proto = Dot.prototype;
  _proto.updateImg = function updateImg() {
    var avatar = this.props.avatar;
    avatar = avatar && avatar !== null ? avatar : '';
    if (avatar.split('?')[0] !== this.state.avatar.split('?')[0]) {
      this.setState({
        avatar: avatar
      });
    }
  };
  _proto.componentDidMount = function componentDidMount() {
    this.updateImg();
  };
  _proto.componentDidUpdate = function componentDidUpdate() {
    this.updateImg();
  };
  _proto.render = function render() {
    var username = this.props.username;
    var color = stringToColor(username);
    var customStyle = this.props.style ? this.props.style : {};
    return /*#__PURE__*/React.createElement("div", {
      className: "ce-avatar-dot",
      style: _extends({}, styles$d.dot, customStyle, {
        backgroundColor: this.state.avatar ? 'white' : color,
        backgroundImage: this.state.avatar && "url(" + this.state.avatar + ")",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '14px'
      })
    });
  };
  return Dot;
}(Component);
var styles$d = {
  dot: {
    width: '13px',
    height: '13px',
    borderRadius: '13px',
    textAlign: 'center'
  }
};
Dot.propTypes = {
  avatar: propTypes.string,
  username: propTypes.string,
  style: propTypes.object
};

var Body = function Body(props) {
  var text = props.text ? props.text : '';
  text = text.replaceAll("<p>", "<div>").replaceAll("</p>", "</div>");
  text = text.replaceAll("<a ", "<a style=\"color: " + (props.myMessage ? 'white' : '#1890ff') + ";\" ");
  return /*#__PURE__*/React.createElement("div", {
    className: "ce_message",
    dangerouslySetInnerHTML: {
      __html: text
    }
  });
};

setConfiguration({
  maxScreenClass: 'xl'
});
var Message = function Message(props) {
  var _useContext = useContext(ChatEngineContext$1),
    conn = _useContext.conn,
    sendingMessages = _useContext.sendingMessages;
  var _useState = useState(false),
    hovered = _useState[0],
    setHovered = _useState[1];
  function hasSendingMessages() {
    var hasSendingMessages = false;
    Object.values(sendingMessages).map(function (sendingMessage) {
      if (sendingMessage) {
        hasSendingMessages = true;
      }
    });
    return hasSendingMessages;
  }
  function renderReads() {
    var chat = props.chat,
      message = props.message;
    if (!chat) {
      return /*#__PURE__*/React.createElement("div", null);
    }
    return chat.people.map(function (chatPerson, index) {
      if (message.id === chatPerson.last_read) {
        if (conn.userName === message.sender_username && hasSendingMessages()) {
          return /*#__PURE__*/React.createElement("div", {
            key: "read_" + index
          });
        }
        return /*#__PURE__*/React.createElement(Dot, {
          key: "read_" + index,
          avatar: chatPerson.person.avatar,
          username: chatPerson.person.username,
          style: {
            "float": 'right',
            marginLeft: '4px'
          }
        });
      }
      return /*#__PURE__*/React.createElement("div", {
        key: "read_" + index
      });
    });
  }
  function renderImages() {
    var message = props.message;
    var attachments = message && message.attachments ? message.attachments : [];
    return attachments.map(function (attachment, index) {
      var fileName = getFileName(attachment.file);
      if (isImage(fileName)) {
        return /*#__PURE__*/React.createElement(Thumbnail$1, {
          attachment: attachment,
          key: "attachment_" + index
        });
      } else {
        return /*#__PURE__*/React.createElement("div", {
          key: "attachment" + index
        });
      }
    });
  }
  function renderFiles() {
    var message = props.message;
    var attachments = message && message.attachments ? message.attachments : [];
    return attachments.map(function (attachment, index) {
      var fileName = getFileName(attachment.file);
      if (!isImage(fileName)) {
        return /*#__PURE__*/React.createElement(FileView, {
          attachment: attachment,
          key: "attachment_" + index
        });
      } else {
        return /*#__PURE__*/React.createElement("div", {
          key: "attachment" + index
        });
      }
    });
  }
  var lastMessage = props.lastMessage,
    message = props.message,
    nextMessage = props.nextMessage;
  if (!message) {
    return /*#__PURE__*/React.createElement("div", null);
  }
  var attachments = message && message.attachments && message.attachments;
  var topRightRadius = !lastMessage || lastMessage.sender_username !== message.sender_username ? '1.3em' : '0.3em';
  var bottomRightRadius = !nextMessage || nextMessage.sender_username !== message.sender_username ? '1.3em' : '0.3em';
  var borderRadius = "1.3em " + topRightRadius + " " + bottomRightRadius + " 1.3em";
  var paddingBottom = !hasSendingMessages() && (!nextMessage || nextMessage.sender_username !== message.sender_username) ? '12px' : '2px';
  return /*#__PURE__*/React.createElement("div", {
    className: "ce-message-row ce-my-message",
    style: {
      width: '100%',
      textAlign: 'right',
      paddingBottom: paddingBottom
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'auto'
    },
    className: "ce-my-message-attachments-container ce-my-message-images-container"
  }, renderImages()), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'auto'
    },
    className: "ce-my-message-attachments-container ce-my-message-files-container"
  }, renderFiles()), /*#__PURE__*/React.createElement(Row, {
    style: {
      paddingRight: '2px'
    },
    className: "ce-message-bubble-row ce-my-message-bubble-row"
  }, /*#__PURE__*/React.createElement(Col, {
    xs: 12,
    sm: 12,
    md: 12
  }, hovered && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      top: 'calc(50% - 12px)',
      right: '8px',
      fontSize: '14px',
      color: 'rgb(24, 144, 255)'
    }
  }, formatTime(getDateTime(message.created, conn !== null && conn.offset))), !attachments || message.text && /*#__PURE__*/React.createElement("div", {
    className: "ce-message-bubble ce-my-message-bubble",
    style: _extends({}, styles$e.myMessage, {
      borderRadius: borderRadius
    }),
    onMouseEnter: function onMouseEnter() {
      return setHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHovered(false);
    }
  }, /*#__PURE__*/React.createElement(Body, {
    myMessage: true,
    text: message.text
  }))), /*#__PURE__*/React.createElement(Col, {
    xs: 1,
    sm: 2,
    md: 3
  }), /*#__PURE__*/React.createElement(Col, {
    xs: 12,
    className: "ce-reads-row ce-my-reads-row"
  }, renderReads())));
};
var styles$e = {
  myMessage: {
    color: 'white',
    cursor: 'pointer',
    "float": 'right',
    textAlign: 'left',
    padding: '12px',
    fontSize: '15px',
    whiteSpace: 'pre-line',
    backgroundColor: 'rgb(24, 144, 255)',
    overflowWrap: 'anywhere',
    maxWidth: 'calc(100% - 100px)'
  }
};

setConfiguration({
  maxScreenClass: 'xl'
});
var TheirMessage = function TheirMessage(props) {
  var _useContext = useContext(ChatEngineContext$1),
    conn = _useContext.conn;
  var _useState = useState(false),
    hovered = _useState[0],
    setHovered = _useState[1];
  function renderReads() {
    var chat = props.chat,
      message = props.message;
    if (!chat) {
      return /*#__PURE__*/React.createElement("div", null);
    }
    return chat.people.map(function (person, index) {
      if (message.id === person.last_read) {
        return /*#__PURE__*/React.createElement(Dot$1, {
          key: "read_" + index,
          avatar: person.person.avatar,
          username: person.person.username,
          style: {
            "float": 'left',
            marginLeft: '4px'
          }
        });
      }
      return /*#__PURE__*/React.createElement("div", {
        key: "read_" + index
      });
    });
  }
  function renderImages() {
    var message = props.message;
    var attachments = message && message.attachments ? message.attachments : [];
    return attachments.map(function (attachment, index) {
      var fileName = getFileName(attachment.file);
      if (isImage(fileName)) {
        return /*#__PURE__*/React.createElement(Thumbnail$1, {
          attachment: attachment,
          key: "attachment_" + index
        });
      } else {
        return /*#__PURE__*/React.createElement("div", {
          key: "attachment" + index
        });
      }
    });
  }
  function renderFiles() {
    var message = props.message;
    var attachments = message && message.attachments ? message.attachments : [];
    return attachments.map(function (attachment, index) {
      var fileName = getFileName(attachment.file);
      if (!isImage(fileName)) {
        return /*#__PURE__*/React.createElement(FileView, {
          attachment: attachment,
          key: "attachment_" + index
        });
      } else {
        return /*#__PURE__*/React.createElement("div", {
          key: "attachment" + index
        });
      }
    });
  }
  var lastMessage = props.lastMessage,
    message = props.message,
    nextMessage = props.nextMessage;
  if (!message) {
    return /*#__PURE__*/React.createElement("div", null);
  }
  var attachments = message && message.attachments && message.attachments;
  var topLeftRadius = !lastMessage || lastMessage.sender_username !== message.sender_username ? '1.3em' : '0.3em';
  var bottomLeftRadius = !nextMessage || nextMessage.sender_username !== message.sender_username ? '1.3em' : '0.3em';
  var borderRadius = topLeftRadius + " 1.3em 1.3em " + bottomLeftRadius;
  var paddingBottom = !nextMessage || nextMessage.sender_username !== message.sender_username ? '12px' : '2px';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      paddingBottom: paddingBottom
    },
    className: "ce-message-row ce-their-message"
  }, (!lastMessage || lastMessage.sender_username !== message.sender_username) && /*#__PURE__*/React.createElement("div", {
    style: styles$f.nameText,
    className: "ce-their-message-sender"
  }, message.sender_username), /*#__PURE__*/React.createElement(Row, {
    style: {
      paddingLeft: '2px'
    },
    className: "ce-their-message-row"
  }, /*#__PURE__*/React.createElement(Col, {
    xs: 12,
    sm: 12,
    md: 12
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '0px'
    },
    className: "ce-their-message-avatar"
  }, (!nextMessage || nextMessage.sender_username !== message.sender_username) && /*#__PURE__*/React.createElement(Avatar$1, {
    show_online: false,
    username: message.sender_username,
    avatar: message.sender && message.sender.avatar
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'auto',
      paddingLeft: '50px'
    },
    className: "ce-their-message-attachments-container ce-their-message-images-container"
  }, renderImages()), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'auto',
      paddingLeft: '50px'
    },
    className: "ce-their-message-attachments-container ce-their-message-files-container"
  }, renderFiles()), !attachments || message.text && /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: '48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ce-message-bubble ce-their-message-bubble",
    style: _extends({}, styles$f.theirMessage, {
      borderRadius: borderRadius
    }),
    onMouseEnter: function onMouseEnter() {
      return setHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHovered(false);
    }
  }, /*#__PURE__*/React.createElement(Body, {
    text: message.text
  }))), hovered && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      top: 'calc(50% - 12px)',
      left: '8px',
      fontSize: '14px',
      color: 'rgba(0, 0, 0, 0.4)'
    }
  }, formatTime(getDateTime(message.created, conn !== null && conn.offset)))), /*#__PURE__*/React.createElement(Col, {
    xs: 9,
    style: {
      marginLeft: '48px'
    },
    className: "ce-reads-row ce-their-reads-row"
  }, renderReads())));
};
var styles$f = {
  theirMessage: {
    cursor: 'pointer',
    color: 'black',
    "float": 'left',
    padding: '12px',
    fontSize: '15px',
    whiteSpace: 'pre-line',
    backgroundColor: '#f1f0f0',
    overflowWrap: 'anywhere',
    maxWidth: 'calc(100% - 100px)'
  },
  nameText: {
    paddingLeft: '62px',
    paddingBottom: '2px',
    color: 'rgba(0, 0, 0, .40)',
    fontSize: '15px'
  }
};

setConfiguration({
  maxScreenClass: 'xl'
});
var SendingMessage = function SendingMessage(props) {
  var didMountRef = useRef(false);
  var _useContext = useContext(ChatEngineContext$1),
    conn = _useContext.conn,
    setConnecting = _useContext.setConnecting;
  var _useState = useState(false),
    hovered = _useState[0],
    setHovered = _useState[1];
  function renderSender() {
    var sender = {};
    props.chat.people.map(function (chat_person) {
      if (conn.userName === chat_person.person.username) {
        sender = chat_person.person;
      }
    });
    return /*#__PURE__*/React.createElement(Dot, {
      avatar: sender.avatar,
      username: sender.username,
      style: {
        "float": 'right',
        marginLeft: '4px'
      }
    });
  }
  useEffect(function () {
    var reconnectID = 0;
    if (!didMountRef.current) {
      didMountRef.current = true;
      reconnectID = setTimeout(function () {
        setConnecting(true);
      }, 4500 + Math.floor(Math.random() * 2000));
    }
    return function () {
      return clearInterval(reconnectID);
    };
  }, []);
  function renderImages(attachments) {
    return attachments.map(function (attachment, index) {
      if (isImage(attachment.name)) {
        return /*#__PURE__*/React.createElement(Thumbnail$1, {
          key: "attachment_" + index
        });
      } else {
        return /*#__PURE__*/React.createElement("div", {
          key: "attachment" + index
        });
      }
    });
  }
  function renderFiles(attachments) {
    return attachments.map(function (attachment, index) {
      if (!isImage(attachment.name)) {
        return /*#__PURE__*/React.createElement(FileView, {
          key: "attachment_" + index
        });
      } else {
        return /*#__PURE__*/React.createElement("div", {
          key: "attachment" + index
        });
      }
    });
  }
  var lastMessage = props.lastMessage,
    message = props.message,
    nextMessage = props.nextMessage;
  if (!message) {
    return /*#__PURE__*/React.createElement("div", null);
  }
  var attachments = message && message.attachments ? message.attachments : [];
  var topRightRadius = !lastMessage || lastMessage.sender_username !== message.sender_username ? '1.3em' : '0.3em';
  var bottomRightRadius = !nextMessage || nextMessage.sender_username !== message.sender_username ? '1.3em' : '0.3em';
  var borderRadius = "1.3em " + topRightRadius + " " + bottomRightRadius + " 1.3em";
  var paddingBottom = !nextMessage || nextMessage.sender_username !== message.sender_username ? '12px' : '2px';
  return /*#__PURE__*/React.createElement("div", {
    className: "ce-message-row ce-my-message ce-my-message-sending",
    style: {
      width: '100%',
      textAlign: 'right',
      paddingBottom: paddingBottom
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'auto'
    },
    className: "ce-my-message-attachments-container ce-my-message-images-container"
  }, renderImages(attachments)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'auto'
    },
    className: "ce-my-message-attachments-container ce-my-message-files-container"
  }, renderFiles(attachments)), /*#__PURE__*/React.createElement(Row, {
    style: {
      paddingRight: '2px'
    },
    className: "ce-message-bubble-row ce-my-message-bubble-row ce-my-message-sending-row"
  }, /*#__PURE__*/React.createElement(Col, {
    xs: 12,
    sm: 12,
    md: 12
  }, hovered && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      top: 'calc(50% - 12px)',
      right: '8px',
      fontSize: '14px',
      color: 'rgb(24, 144, 255)'
    }
  }, formatTime(getDateTime(message.created, conn !== null && conn.offset))), message.text && /*#__PURE__*/React.createElement("div", {
    className: "ce-message-bubble ce-my-message-bubble",
    style: _extends({}, styles$g.myMessage, {
      borderRadius: borderRadius
    }),
    onMouseEnter: function onMouseEnter() {
      return setHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHovered(false);
    }
  }, /*#__PURE__*/React.createElement(Body, {
    text: message.text
  }))), /*#__PURE__*/React.createElement(Col, {
    xs: 1,
    sm: 2,
    md: 3
  }), /*#__PURE__*/React.createElement(Col, {
    xs: 12,
    className: "ce-reads-row ce-my-reads-row"
  }, !nextMessage && renderSender())));
};
var styles$g = {
  myMessage: {
    color: 'white',
    cursor: 'pointer',
    "float": 'right',
    textAlign: 'left',
    padding: '12px',
    fontSize: '15px',
    whiteSpace: 'pre-line',
    backgroundColor: '#40a9ff',
    overflowWrap: 'anywhere',
    maxWidth: 'calc(100% - 100px)'
  }
};

var Message$1 = function Message$1(props) {
  var lastMessage = props.lastMessage,
    message = props.message,
    nextMessage = props.nextMessage,
    sending = props.sending,
    chat = props.chat;
  var _useContext = useContext(ChatEngineContext),
    conn = _useContext.conn;
  if (!message || !chat) {
    return /*#__PURE__*/React.createElement("div", null);
  }
  if (!conn || conn === null) {
    return /*#__PURE__*/React.createElement("div", null);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "ce-message-and-date"
  }, !sending && /*#__PURE__*/React.createElement(DatePartition, {
    lastCreated: lastMessage ? lastMessage.created : null,
    created: message.created,
    offset: conn.offset
  }), sending ? /*#__PURE__*/React.createElement(SendingMessage, {
    chat: chat,
    conn: conn,
    lastMessage: lastMessage,
    message: message,
    nextMessage: nextMessage
  }) : /*#__PURE__*/React.createElement("div", null, message.sender_username === conn.userName || message.sender_username === conn.senderUsername ? /*#__PURE__*/React.createElement(Message, {
    chat: chat,
    conn: conn,
    lastMessage: lastMessage,
    message: message,
    nextMessage: nextMessage
  }) : /*#__PURE__*/React.createElement(TheirMessage, {
    chat: chat,
    conn: conn,
    lastMessage: lastMessage,
    message: message,
    nextMessage: nextMessage
  })));
};

var Messages = function Messages(props) {
  var _useContext = useContext(ChatEngineContext),
    conn = _useContext.conn,
    chats = _useContext.chats,
    messages = _useContext.messages,
    activeChat = _useContext.activeChat,
    setIsBottomVisible = _useContext.setIsBottomVisible;
  var chat = chats && chats[activeChat];
  var keys = Object.keys(messages);
  if (!conn || conn === null || !chat) return /*#__PURE__*/React.createElement("div", null);
  return keys.map(function (key, index) {
    var message = messages[key];
    var lastMessageKey = index === 0 ? null : keys[index - 1];
    var nextMessageKey = index === keys.length - 1 ? null : keys[index + 1];
    if (props.renderMessageBubble) {
      return /*#__PURE__*/React.createElement("div", {
        key: "message_" + index
      }, index === keys.length - 1 && /*#__PURE__*/React.createElement(RenderTrigger, {
        onEnter: function onEnter() {
          return setIsBottomVisible(true);
        },
        onLeave: function onLeave() {
          return setIsBottomVisible(false);
        }
      }), props.renderMessageBubble(conn, chat, messages[lastMessageKey], message, messages[nextMessageKey]));
    }
    return /*#__PURE__*/React.createElement("div", {
      key: "message_" + index,
      id: "ce-message-" + message.id
    }, index === keys.length - 1 && /*#__PURE__*/React.createElement(RenderTrigger, {
      onEnter: function onEnter() {
        return setIsBottomVisible(true);
      },
      onLeave: function onLeave() {
        return setIsBottomVisible(false);
      }
    }), /*#__PURE__*/React.createElement(Message$1, {
      chat: chat,
      message: message,
      lastMessage: messages[lastMessageKey],
      nextMessage: messages[nextMessageKey]
    }));
  });
};

var SendingMessages = function SendingMessages(props) {
  var _useContext = useContext(ChatEngineContext),
    conn = _useContext.conn,
    chats = _useContext.chats,
    activeChat = _useContext.activeChat,
    sendingMessages = _useContext.sendingMessages;
  var keys = Object.keys(sendingMessages);
  var chat = chats && chats[activeChat];
  if (!conn || conn === null) return /*#__PURE__*/React.createElement("div", null);
  return keys.map(function (key, index) {
    var message = sendingMessages[key];
    var lastMessageKey = index === 0 ? null : keys[index - 1];
    var nextMessageKey = index === keys.length - 1 ? null : keys[index + 1];
    if (message && message.chat === activeChat) {
      return /*#__PURE__*/React.createElement("div", {
        key: "sending-msg-" + index
      }, props.renderSendingMessage ? props.renderSendingMessage(conn, chat, sendingMessages[lastMessageKey], message, sendingMessages[nextMessageKey]) : /*#__PURE__*/React.createElement(Message$1, {
        sending: true,
        chat: chat,
        message: message,
        lastMessage: sendingMessages[lastMessageKey],
        nextMessage: sendingMessages[nextMessageKey]
      }));
    }
  });
};

var IsTyping = function IsTyping() {
  var didMountRef = useRef(false);
  var _useState = useState(Date.now()),
    currentTime = _useState[0],
    setCurrentTime = _useState[1];
  var _useContext = useContext(ChatEngineContext),
    conn = _useContext.conn,
    activeChat = _useContext.activeChat,
    typingCounter = _useContext.typingCounter;
  var typers = typingCounter && typingCounter[activeChat] ? typingCounter[activeChat] : [];
  useEffect(function () {
    if (!didMountRef.current) {
      didMountRef.current = true;
      setInterval(function () {
        setCurrentTime(Date.now());
      }, 1000);
    }
  });
  if (!conn || conn === null) return /*#__PURE__*/React.createElement("div", null);
  return /*#__PURE__*/React.createElement("div", null, Object.keys(typers).map(function (username, index) {
    if (conn.userName !== username && currentTime < typers[username] + 2000) {
      return /*#__PURE__*/React.createElement("div", {
        key: "typer_" + index,
        className: "ce-user-typing-text",
        style: {
          color: stringToColor(username),
          padding: '2px',
          paddingLeft: '12px'
        }
      }, username + " is typing...");
    } else {
      return /*#__PURE__*/React.createElement("div", {
        key: "typer_" + index
      });
    }
  }));
};

var images$1 = ['jpg', 'jpeg', 'png', 'gif', 'tiff'];
var isImage$1 = function isImage(fileName) {
  var dotSplit = fileName.split('.');
  return dotSplit.length > 0 && images$1.indexOf(dotSplit[dotSplit.length - 1].toLowerCase()) !== -1;
};

var FilePreview = function FilePreview(props) {
  var _useState = useState(false),
    hovered = _useState[0],
    setHovered = _useState[1];
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: function onMouseEnter() {
      return setHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHovered(false);
    },
    style: _extends({}, styles$h.filePreview, {
      paddingRight: hovered ? '6px' : '26px'
    })
  }, /*#__PURE__*/React.createElement(FileOutlined, null), ' ', props.file && props.file.name, " ", ' ', hovered && /*#__PURE__*/React.createElement(CloseCircleTwoTone, {
    style: styles$h.closeIcon,
    onClick: function onClick() {
      return props.onRemove && props.onRemove();
    }
  }));
};
var styles$h = {
  filePreview: {
    padding: '12px',
    display: 'inline-block',
    position: "relative",
    border: '1px solid #40a9ff',
    color: '#434343',
    borderRadius: '14px'
  },
  closeIcon: {}
};

var FilesRow = function FilesRow(props) {
  function renderFiles() {
    return props.files.map(function (file, index) {
      if (!isImage$1(file.name)) {
        return /*#__PURE__*/React.createElement(FilePreview, {
          file: file,
          key: "thumb_" + index,
          onRemove: function onRemove() {
            return props.onRemove && props.onRemove(index);
          }
        });
      } else {
        return /*#__PURE__*/React.createElement("div", {
          key: "no_file_" + index
        });
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 'calc(100% - 24px)',
      padding: props.files.lenth > 0 ? '6px 16px' : '0px'
    }
  }, renderFiles());
};

var Thumbnail$2 = function Thumbnail(props) {
  var _useState = useState(false),
    hovered = _useState[0],
    setHovered = _useState[1];
  var _useState2 = useState(''),
    blob = _useState2[0],
    setBlob = _useState2[1];
  useEffect(function () {
    setBlob(URL.createObjectURL(props.file));
  }, [props.file]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px',
      display: 'inline-block',
      position: "relative"
    },
    onMouseEnter: function onMouseEnter() {
      return setHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHovered(false);
    }
  }, /*#__PURE__*/React.createElement("img", {
    style: styles$i.imageSquare,
    alt: props.file ? props.file.name : '',
    src: blob
  }), hovered && /*#__PURE__*/React.createElement(CloseCircleTwoTone, {
    style: styles$i.closeIcon,
    onClick: function onClick() {
      return props.onRemove && props.onRemove();
    }
  }));
};
var styles$i = {
  imageSquare: {
    height: '108px',
    width: '108px',
    border: '1px solid #afafaf',
    borderRadius: '8px',
    objectFit: 'cover',
    display: 'inline'
  },
  closeIcon: {
    position: 'absolute',
    bottom: 'calc(100% - 32px)',
    left: '96px',
    width: '0px',
    cursor: 'pointer'
  }
};

var ImagesRow = function ImagesRow(props) {
  function renderFiles() {
    return props.files.map(function (file, index) {
      if (isImage$1(file.name)) {
        return /*#__PURE__*/React.createElement(Thumbnail$2, {
          file: file,
          key: "thumb_" + index,
          onRemove: function onRemove() {
            return props.onRemove && props.onRemove(index);
          }
        });
      } else {
        return /*#__PURE__*/React.createElement("div", {
          key: "no_thumb_" + index
        });
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 'calc(100% - 24px)',
      paddingLeft: '12px'
    }
  }, renderFiles());
};

var AttachmentsInput = function AttachmentsInput(props) {
  var _useState = useState({
      hovered: false
    }),
    state = _useState[0],
    setState = _useState[1];
  function onSelect(event) {
    var files = Array.from(event.target.files);
    props.onSelectFiles && props.onSelectFiles(files);
  }
  return /*#__PURE__*/React.createElement("form", {
    className: "uploader",
    encType: "multipart/form-data",
    style: {
      height: '0px'
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "files",
    id: "upload-document-button"
  }, /*#__PURE__*/React.createElement(PaperClipOutlined, {
    onMouseEnter: function onMouseEnter() {
      return setState(_extends({}, state, {
        hovered: true
      }));
    },
    onMouseLeave: function onMouseLeave() {
      return setState(_extends({}, state, {
        hovered: false
      }));
    },
    style: _extends({}, styles$j.icon, {
      color: state.hovered ? '#06c' : '#444'
    })
  })), /*#__PURE__*/React.createElement("input", {
    multiple: true,
    id: "files",
    style: {
      visibility: "hidden"
    },
    type: "file",
    onChange: function onChange(e) {
      return onSelect(e);
    },
    onClick: function onClick(e) {
      return e.target.value = null;
    }
  }));
};
var styles$j = {
  icon: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-block',
    "float": 'left',
    height: '24px',
    padding: '4px 5px',
    width: '28px'
  }
};

var SendButton = function SendButton() {
  var _useState = useState(false),
    hover = _useState[0],
    setHover = _useState[1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: "0px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    id: "ce-send-message-button",
    onMouseEnter: function onMouseEnter() {
      return setHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHover(false);
    },
    style: {
      cursor: 'pointer',
      backgroundColor: hover ? '#40a9ff' : '#1890ff',
      display: 'inline-block',
      padding: '5px 9px',
      borderRadius: '8px'
    }
  }, /*#__PURE__*/React.createElement(ArrowUpOutlined, {
    style: {
      color: 'white'
    }
  })));
};

var _this$3 = undefined;
var ReactQuill = require('react-quill');
var NewMessageForm$1 = function NewMessageForm() {
  var _useContext = useContext(ChatEngineContext$1),
    conn = _useContext.conn,
    activeChat = _useContext.activeChat,
    sendingMessages = _useContext.sendingMessages,
    setSendingMessages = _useContext.setSendingMessages;
  var _useState = useState(0),
    iter = _useState[0],
    setIter = _useState[1];
  var _useState2 = useState(''),
    value = _useState2[0],
    setValue = _useState2[1];
  var _useState3 = useState(0),
    trigger = _useState3[0],
    setTrigger = _useState3[1];
  var _useState4 = useState([]),
    attachments = _useState4[0],
    setAttachments = _useState4[1];
  var modules = {
    toolbar: {
      container: "#toolbar"
    }
  };
  var formats = ['bold', 'italic', 'underline', 'strike', 'code', 'list', 'bullet', 'indent', 'link', 'code'];
  function _onRemove(index) {
    var newAttachments = attachments;
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
    setIter(iter + 1);
  }
  function handleChange(value) {
    setValue(value);
    setTrigger((trigger + 1) % 4);
    if (trigger === 1) {
      conn && isTyping$1(conn, activeChat);
    }
  }
  function handleSubmit() {
    if (!conn) return;
    var text = value.trim();
    if (text.length > 11 && text.slice(-11) === '<p><br></p>') {
      text = text.substr(0, text.length - 11);
    }
    var custom_json = {
      sender_id: Date.now().toString()
    };
    var sender_username = conn.userName ? conn.userName : conn.senderUsername;
    var created = pythonFormatDate(new Date(), conn.offset ? conn.offset : 0);
    var data = {
      text: text,
      attachments: attachments,
      custom_json: custom_json,
      sender_username: sender_username,
      chat: activeChat,
      created: created
    };
    if (text.length > 0 || attachments.length > 0) {
      sendMessage$1(conn, activeChat, data, function () {});
    }
    setValue('');
    setAttachments([]);
    var newSendingMessages = _extends({}, sendingMessages);
    newSendingMessages[data.custom_json.sender_id] = data;
    setSendingMessages(newSendingMessages);
  }
  return /*#__PURE__*/React.createElement("div", {
    id: "msg-form-container",
    style: styles$k.NewMessageFormContainer,
    className: "ce-message-form-container"
  }, /*#__PURE__*/React.createElement(ImagesRow, {
    files: attachments,
    onRemove: function onRemove(i) {
      return _onRemove(i);
    }
  }), /*#__PURE__*/React.createElement(FilesRow, {
    files: attachments,
    onRemove: function onRemove(i) {
      return _onRemove(i);
    }
  }), /*#__PURE__*/React.createElement(ReactQuill, {
    theme: "snow",
    value: value,
    modules: modules,
    formats: formats,
    onChange: handleChange.bind(_this$3),
    onKeyDown: function onKeyDown(e) {
      if (e.keyCode === 13) {
        handleSubmit();
      }
    }
  }), /*#__PURE__*/React.createElement("div", {
    id: "toolbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ql-bold"
  }), /*#__PURE__*/React.createElement("button", {
    className: "ql-italic"
  }), /*#__PURE__*/React.createElement("button", {
    className: "ql-underline"
  }), /*#__PURE__*/React.createElement("button", {
    className: "ql-strike"
  }), /*#__PURE__*/React.createElement("button", {
    className: "ql-code"
  }), /*#__PURE__*/React.createElement("button", {
    className: "ql-link"
  }), /*#__PURE__*/React.createElement(AttachmentsInput, {
    onSelectFiles: function onSelectFiles(attachments) {
      return setAttachments(attachments);
    }
  }), /*#__PURE__*/React.createElement("div", {
    onClick: handleSubmit.bind(_this$3),
    style: {
      position: 'absolute',
      right: '5px',
      bottom: '37px'
    }
  }, /*#__PURE__*/React.createElement(SendButton, null))));
};
var styles$k = {
  NewMessageFormContainer: {
    position: 'absolute',
    bottom: '0px',
    width: '100%',
    backgroundColor: 'white'
  },
  inputContainer: {
    minHeight: '36px',
    paddingTop: '10px',
    paddingBottom: '6px'
  }
};

var ConnectionBar = function ConnectionBar(props) {
  var didMountRef = useRef(false);
  var _useState = useState(false),
    isVisible = _useState[0],
    setIsVisible = _useState[1];
  var _useContext = useContext(ChatEngineContext),
    connecting = _useContext.connecting;
  useEffect(function () {
    if (!didMountRef.current) {
      didMountRef.current = true;
      setTimeout(function () {
        return setIsVisible(true);
      }, props.renderDelay ? props.renderDelay : 0);
    }
  });
  if (!connecting || !isVisible) return /*#__PURE__*/React.createElement("div", null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      zIndex: '1',
      bottom: '66px',
      left: 'calc(50% - 78px)',
      position: 'absolute',
      fontSize: '15px',
      padding: '10px 22px',
      color: 'white',
      backgroundColor: '#fa8c16',
      borderRadius: '1.3em'
    },
    id: "ce-connecting-popup"
  }, /*#__PURE__*/React.createElement(SyncOutlined, {
    spin: true
  }), ' ', "Connecting");
};

var ScrollDownBar = function ScrollDownBar(props) {
  var _useContext = useContext(ChatEngineContext$1),
    conn = _useContext.conn,
    isBottomVisible = _useContext.isBottomVisible;
  var chat = props.chat;
  if (conn === null || !chat || chat === null) return /*#__PURE__*/React.createElement("div", null);
  var lastReadMessage = undefined;
  chat.people.map(function (person) {
    if (person.person.username === conn.userName) {
      lastReadMessage = person.last_read;
    }
  });
  if (isBottomVisible || chat.last_message.id === undefined || chat.last_message.id === lastReadMessage) {
    return /*#__PURE__*/React.createElement("div", null);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      zIndex: '1',
      bottom: '94px',
      left: 'calc(50% - 78px)',
      position: 'absolute',
      fontSize: '15px',
      padding: '10px 22px',
      color: 'white',
      backgroundColor: '#389e0d',
      borderRadius: '1.3em',
      cursor: 'pointer'
    },
    id: "ce-scroll-down-bar",
    onClick: function onClick() {
      return animateScroll.scrollToBottom({
        duration: 333,
        containerId: "ce-feed-container"
      });
    }
  }, /*#__PURE__*/React.createElement(CaretDownOutlined, null), conn.userName ? ' Unread Messages' : ' Scroll to Bottom');
};

var initial = 45;
var count = initial;
var interval$1 = 33;
var ChatFeed = function ChatFeed(props) {
  var _useState = useState(false),
    hasFetchedMessages = _useState[0],
    setHasFetchedMessages = _useState[1];
  var _useState2 = useState(null),
    currentChat = _useState2[0],
    setCurrentChat = _useState2[1];
  var _useContext = useContext(ChatEngineContext$1),
    conn = _useContext.conn,
    chats = _useContext.chats,
    setChats = _useContext.setChats,
    sendingMessages = _useContext.sendingMessages,
    messages = _useContext.messages,
    setMessages = _useContext.setMessages,
    activeChat = _useContext.activeChat,
    setActiveChat = _useContext.setActiveChat,
    loadMoreMessages = _useContext.loadMoreMessages,
    setLoadMoreMessages = _useContext.setLoadMoreMessages,
    isBottomVisible = _useContext.isBottomVisible,
    typingCounter = _useContext.typingCounter;
  var typers = typingCounter && typingCounter[activeChat] ? typingCounter[activeChat] : [];
  var chat = chats && chats[currentChat];
  var needsIceBreaker = hasFetchedMessages && _$1.isEmpty(messages) && _$1.isEmpty(sendingMessages);
  function onReadMessage(chat) {
    if (chats) {
      var newChats = _extends({}, chats);
      newChats[chat.id] = chat;
      setChats(newChats);
    }
  }
  function onGetMessages(chatId, messages, scrollDownTo) {
    setHasFetchedMessages(true);
    setMessages(_$1.mapKeys(messages, 'id'));
    if (messages.length > 0) {
      var message = messages[messages.length - 1];
      if (props.userName && props.userName !== message.sender_username) {
        readMessage$1(conn, chatId, message.id, function (chat) {
          return onReadMessage(chat);
        });
      }
    }
    if (scrollDownTo) {
      animateScroll.scrollToBottom({
        duration: 0,
        containerId: scrollDownTo
      });
    }
    props.onGetMessages && props.onGetMessages(chatId, messages);
  }
  function loadMessages(loadMoreMessages) {
    if (loadMoreMessages) {
      count = count + interval$1;
      setLoadMoreMessages(false);
      getLatestMessages$1(conn, activeChat, count, function (chatId, messages) {
        return onGetMessages(chatId, messages, false);
      });
    } else if (conn && !props.activeChat && activeChat !== null && activeChat !== currentChat) {
      count = initial;
      setCurrentChat(activeChat);
      getLatestMessages$1(conn, activeChat, count, function (chatId, messages) {
        return onGetMessages(chatId, messages, "ce-feed-container");
      });
    } else if (conn && props.activeChat && props.activeChat !== currentChat) {
      count = initial;
      setActiveChat(props.activeChat);
      setCurrentChat(props.activeChat);
      getLatestMessages$1(conn, props.activeChat, count, function (chatId, messages) {
        return onGetMessages(chatId, messages, "ce-feed-container");
      });
    }
  }
  useEffect(function () {
    loadMessages(false);
  }, [conn, activeChat, currentChat]);
  useEffect(function () {
    loadMessages(loadMoreMessages);
  }, [loadMoreMessages]);
  function getMyLastMessage(userName, chat) {
    var lastReadMessage = undefined;
    chat.people.map(function (person) {
      if (person.person.username === userName) {
        lastReadMessage = person.last_read;
      }
    });
    return lastReadMessage;
  }
  useEffect(function () {
    if (isBottomVisible && !_$1.isEmpty(messages)) {
      animateScroll.scrollToBottom({
        duration: 333,
        containerId: "ce-feed-container"
      });
      if (getMyLastMessage(conn.userName, chat) && getMyLastMessage(conn.userName, chat) !== chat.last_message.id) {
        readMessage$1(conn, currentChat, chat.last_message.id, function (chat) {
          return onReadMessage(chat);
        });
      }
    }
  }, [sendingMessages, messages, isBottomVisible]);
  if (conn === undefined) {
    return /*#__PURE__*/React.createElement(AuthFail, props);
  } else if (conn && chats !== null && _$1.isEmpty(chats)) {
    return /*#__PURE__*/React.createElement(CreateChat, null);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "ce-chat-feed",
    style: {
      height: '100%',
      maxHeight: '100vh',
      backgroundColor: '#f0f0f0'
    }
  }, props.renderChatHeader ? props.renderChatHeader(chat) : /*#__PURE__*/React.createElement(ChatHeader, null), /*#__PURE__*/React.createElement("div", {
    id: "ce-feed-container",
    style: styles$l.feedContainer,
    className: "ce-chat-feed-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '88px'
    },
    className: "ce-feed-container-top"
  }), Object.keys(messages).length > 0 && /*#__PURE__*/React.createElement(RenderTrigger, {
    onEnter: function onEnter() {
      return setLoadMoreMessages(true);
    }
  }), needsIceBreaker && props.renderIceBreaker && props.renderIceBreaker(chat), needsIceBreaker && !props.renderIceBreaker && /*#__PURE__*/React.createElement(IceBreaker, null), /*#__PURE__*/React.createElement(Messages, props), /*#__PURE__*/React.createElement(SendingMessages, props), props.renderIsTyping ? props.renderIsTyping(typers) : /*#__PURE__*/React.createElement(IsTyping, null), props.renderConnectionBar ? props.renderConnectionBar(chat) : /*#__PURE__*/React.createElement(ConnectionBar, {
    renderDelay: 3000
  }), props.renderScrollDownBar ? props.renderScrollDownBar(chat) : /*#__PURE__*/React.createElement(ScrollDownBar, {
    chat: chat
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '86px'
    },
    className: "ce-feed-container-bottom"
  })), props.renderNewMessageForm ? props.renderNewMessageForm(props, currentChat) : /*#__PURE__*/React.createElement(NewMessageForm$1, null));
};
var styles$l = {
  feedContainer: {
    width: '100%',
    height: '100%',
    maxHeight: '100vh',
    overflowX: 'hidden',
    overflowY: 'scroll',
    backgroundColor: 'white'
  }
};

setConfiguration({
  maxScreenClass: 'xl',
  gutterWidth: 0
});
var ChatEngine = function ChatEngine(props) {
  var context = useContext(ChatEngineContext);
  var height = props.height;
  var propsAndContext = _extends({}, props, context);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'left',
      backgroundColor: 'white'
    }
  }, /*#__PURE__*/React.createElement(Socket$1, props), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    xs: 0,
    sm: 3,
    style: {
      height: height ? height : ''
    }
  }, props.renderChatList ? props.renderChatList(propsAndContext) : /*#__PURE__*/React.createElement(ChatList, _extends({}, propsAndContext, {
    onChatClick: function onChatClick(chatID) {
      if (props.renderChatFeed) {
        getLatestMessages$1(props, chatID, 45, function (id, list) {
          context.setMessages(_extends({}, _$1.mapKeys(list, 'id')));
        });
      }
    }
  }))), /*#__PURE__*/React.createElement(Col, {
    xs: 12,
    sm: 6,
    style: {
      height: height ? height : ''
    }
  }, props.renderChatFeed ? props.renderChatFeed(propsAndContext) : /*#__PURE__*/React.createElement(ChatFeed, propsAndContext)), /*#__PURE__*/React.createElement(Col, {
    xs: 0,
    sm: 3,
    style: {
      height: height ? height : ''
    }
  }, props.renderChatSettings ? props.renderChatSettings(props) : /*#__PURE__*/React.createElement(ChatSettings, props))));
};

var ChatEngineApp = function ChatEngineApp(props) {
  if (useContext(ChatEngineContext)) {
    return /*#__PURE__*/React.createElement(ChatEngine, props);
  } else {
    return /*#__PURE__*/React.createElement(ChatEngineWrapper, null, /*#__PURE__*/React.createElement(ChatEngine, props));
  }
};

var _dangerButton;
var Button = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Button, _Component);
  function Button() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      hovered: false
    };
    return _this;
  }
  var _proto = Button.prototype;
  _proto.render = function render() {
    var _this2 = this;
    var _this$props = this.props,
      value = _this$props.value,
      icon = _this$props.icon,
      theme = _this$props.theme,
      style = _this$props.style,
      id = _this$props.id,
      type = _this$props.type,
      _onClick = _this$props.onClick;
    var customStyle = style ? style : {};
    var hoverStyle = this.state.hovered ? styles$m.hoverButton : {};
    var themeStyle = theme === 'danger' ? styles$m.dangerButton : styles$m.button;
    return /*#__PURE__*/React.createElement("button", {
      id: id,
      type: type,
      onClick: function onClick() {
        return _onClick && _onClick();
      },
      onMouseEnter: function onMouseEnter() {
        return _this2.setState({
          hovered: true
        });
      },
      onMouseLeave: function onMouseLeave() {
        return _this2.setState({
          hovered: false
        });
      },
      style: _extends({}, themeStyle, customStyle, hoverStyle),
      className: "ce-primary-button " + (theme === 'danger' ? 'ce-danger-button' : '')
    }, icon === 'plus' && /*#__PURE__*/React.createElement(PlusOutlined, null), icon === 'delete' && /*#__PURE__*/React.createElement(DeleteOutlined, null), icon === 'user-add' && /*#__PURE__*/React.createElement(UserAddOutlined, null), value && icon ? " " + value : value);
  };
  return Button;
}(Component);
var styles$m = {
  button: {
    color: 'white',
    border: 'none',
    outline: 'none',
    height: '36px',
    fontSize: '15px',
    cursor: 'pointer',
    padding: '8px 16px',
    borderRadius: '33px',
    backgroundColor: '#1890ff'
  },
  dangerButton: (_dangerButton = {
    color: 'red',
    border: 'none',
    outline: 'none',
    height: '36px',
    fontSize: '15px',
    cursor: 'pointer',
    padding: '8px 16px',
    borderRadius: '33px',
    backgroundColor: 'white'
  }, _dangerButton["border"] = '1px solid red', _dangerButton),
  hoverButton: {
    opacity: '0.66'
  }
};
Button.propTypes = {
  value: propTypes.string,
  onClick: propTypes.func,
  style: propTypes.object,
  id: propTypes.string,
  icon: propTypes.oneOf([undefined, 'plus', 'delete', 'user-add']),
  theme: propTypes.oneOf([undefined, 'danger']),
  type: propTypes.oneOf([undefined, 'submit'])
};

var Avatar = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Avatar, _Component);
  function Avatar() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      avatar: ''
    };
    return _this;
  }
  var _proto = Avatar.prototype;
  _proto.updateImg = function updateImg() {
    var avatar = this.props.avatar;
    avatar = avatar && avatar !== null ? avatar : '';
    if (avatar.split('?')[0] !== this.state.avatar.split('?')[0]) {
      this.setState({
        avatar: avatar
      });
    }
  };
  _proto.componentDidMount = function componentDidMount() {
    this.updateImg();
  };
  _proto.componentDidUpdate = function componentDidUpdate() {
    this.updateImg();
  };
  _proto.render = function render() {
    var _this$props = this.props,
      username = _this$props.username,
      is_online = _this$props.is_online;
    var customStyle = this.props.style ? this.props.style : {};
    var text = username ? username.substring(0, 2).toUpperCase() : '';
    var color = stringToColor(username);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: '48px',
        height: '48px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: '0px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ce-avatar",
      style: _extends({}, styles$n.avatar, customStyle, {
        backgroundColor: this.state.avatar ? 'white' : color,
        backgroundImage: this.state.avatar && "url(" + this.state.avatar + ")",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '48px'
      })
    }, /*#__PURE__*/React.createElement("div", {
      className: "ce-avatar-text",
      style: styles$n.avatarText
    }, !this.state.avatar && text))), this.props.show_online !== false && /*#__PURE__*/React.createElement("div", {
      className: "ce-avatar-status",
      style: _extends({}, styles$n.status, {
        backgroundColor: is_online ? '#52c41a' : '#f5222d'
      })
    }));
  };
  return Avatar;
}(Component);
var styles$n = {
  avatar: {
    width: '44px',
    height: '44px',
    borderRadius: '22px',
    color: 'white',
    textAlign: 'center'
  },
  avatarText: {
    color: 'white',
    paddingTop: '12px',
    fontSize: '15px',
    fontWeight: '600'
  },
  status: {
    width: '8px',
    height: '8px',
    borderRadius: '100%',
    border: '2px solid white'
  }
};
Avatar.propTypes = {
  avatar: propTypes.string,
  username: propTypes.string,
  style: propTypes.object,
  is_online: propTypes.bool,
  show_online: propTypes.bool
};

var TextInput = /*#__PURE__*/function (_Component) {
  _inheritsLoose(TextInput, _Component);
  function TextInput() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      focused: false,
      value: null
    };
    return _this;
  }
  var _proto = TextInput.prototype;
  _proto.componentDidMount = function componentDidMount() {
    var value = this.props["default"];
    if (value) {
      var event = {
        target: {
          value: value
        }
      };
      this.props.handleChange(event);
      this.setState({
        value: value
      });
    }
  };
  _proto.render = function render() {
    var _this2 = this;
    var customStyle = this.props.style ? this.props.style : {};
    var defaultStyle = this.state.focused ? styles$o.focusInput : styles$o.input;
    return (
      /*#__PURE__*/
      React.createElement("input", {
        id: this.props.id,
        autoFocus: this.props.autoFocus,
        className: "ce-input ce-text-input",
        value: this.props.value,
        placeholder: this.props.label,
        style: _extends({}, defaultStyle, customStyle),
        onBlur: function onBlur() {
          _this2.setState({
            focused: false
          });
          _this2.props.onBlur && _this2.props.onBlur();
        },
        onFocus: function onFocus() {
          _this2.setState({
            focused: true
          });
          _this2.props.onFocus && _this2.props.onFocus();
        },
        type: this.props.type ? this.props.type : "text",
        onChange: function onChange(e) {
          return _this2.props.handleChange && _this2.props.handleChange(e);
        }
      })
    );
  };
  return TextInput;
}(Component);
var styles$o = {
  input: {
    height: '36px',
    fontSize: '15px',
    outline: 'none',
    borderRadius: '24px',
    border: '1px solid #d9d9d9',
    padding: '0px 12px',
    boxSizing: 'border-box'
  },
  focusInput: {
    height: '36px',
    fontSize: '15px',
    outline: 'none',
    borderRadius: '24px',
    border: '1px solid #1890ff',
    padding: '0px 12px',
    boxSizing: 'border-box'
  }
};
TextInput.propTypes = {
  "default": propTypes.string,
  value: propTypes.string,
  label: propTypes.string,
  type: propTypes.oneOf(['text', 'password', 'number']),
  autoFocus: propTypes.bool,
  id: propTypes.string,
  style: propTypes.object,
  handleChange: propTypes.func,
  onFocus: propTypes.func,
  onBlur: propTypes.func
};

var AutoCompleteInput = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AutoCompleteInput, _Component);
  function AutoCompleteInput() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      focused: false,
      showAll: false
    };
    return _this;
  }
  var _proto = AutoCompleteInput.prototype;
  _proto.onFocus = function onFocus() {
    this.onChange('', true);
    this.setState({
      focused: true
    });
    this.props.onFocus && this.props.onFocus();
  };
  _proto.onBlur = function onBlur() {
    this.setState({
      focused: false
    });
    this.props.onBlur && this.props.onBlur();
  };
  _proto.onChange = function onChange(value, showAll) {
    this.setState({
      showAll: showAll
    });
    this.props.handleChange && this.props.handleChange(value);
  };
  _proto.getNames = function getNames() {
    var _this2 = this;
    var count = 0;
    var max = this.props.max ? this.props.max : 3;
    var results = [];
    this.props.options.map(function (option) {
      if (JSON.stringify(option).toLowerCase().indexOf(_this2.props.value.toLowerCase()) !== -1 && count < max) {
        count = count + 1;
        results.push(option);
      }
    });
    return results;
  };
  _proto.renderOptions = function renderOptions() {
    var _this3 = this;
    if (!this.props.value && !this.state.showAll) {
      return /*#__PURE__*/React.createElement("div", null);
    }
    var results = this.getNames();
    return results.map(function (option, index) {
      return /*#__PURE__*/React.createElement("div", {
        key: "option_" + index,
        className: "ce-autocomplete-option"
      }, _this3.props.renderOption && _this3.props.renderOption(option), index === results.length - 1 && /*#__PURE__*/React.createElement("div", {
        style: styles$p.close,
        className: "ce-autocomplete-close",
        onClick: function onClick() {
          return _this3.onChange('', false);
        }
      }, /*#__PURE__*/React.createElement(CloseOutlined, null)));
    });
  };
  _proto.render = function render() {
    var _this4 = this;
    var options = this.props.options;
    var customStyle = this.props.style ? this.props.style : {};
    var defaultStyle = _extends({}, styles$p.input, {
      border: this.state.focused ? '1px solid #1890ff' : '1px solid #d9d9d9'
    });
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      id: "ce-add-username-input",
      className: "ce-input ce-autocomplete-input",
      value: this.props.value,
      placeholder: this.props.label,
      style: _extends({}, defaultStyle, customStyle),
      type: this.props.type ? this.props.type : "text",
      onBlur: function onBlur() {
        return _this4.onBlur();
      },
      onFocus: function onFocus() {
        return _this4.onFocus();
      },
      onChange: function onChange(e) {
        return _this4.onChange(e.target.value, true);
      }
    }), options && options.length > 0 && this.state.showAll && /*#__PURE__*/React.createElement("div", {
      className: "ce-autocomplete-options",
      style: {
        borderRadius: '19px',
        border: '1px solid #afafaf',
        overflow: 'hidden'
      }
    }, this.props.options && this.renderOptions()));
  };
  return AutoCompleteInput;
}(Component);
var styles$p = {
  input: {
    height: '36px',
    fontSize: '15px',
    outline: 'none',
    borderRadius: '24px',
    padding: '0px 12px',
    boxSizing: 'border-box',
    fontFamily: 'Avenir'
  },
  close: {
    cursor: 'pointer',
    textAlign: 'center',
    padding: '8px 12px',
    fontSize: '15px',
    borderRadius: '24px'
  }
};
AutoCompleteInput.propTypes = {
  "default": propTypes.string,
  value: propTypes.string,
  options: propTypes.arrayOf(propTypes.object),
  max: propTypes.number,
  label: propTypes.string,
  type: propTypes.oneOf(['text', 'number']),
  style: propTypes.object,
  handleChange: propTypes.func,
  onFocus: propTypes.func,
  onBlur: propTypes.func
};

function getChats(props, callback) {
  axios.get(getApiUrl(props) + "/chats/", {
    headers: getHeaders(props)
  }).then(function (response) {
    props.onGetChats && props.onGetChats(response.data);
    callback && callback(response.data);
  })["catch"](function (error) {
    console.log('Fetch Chats Error', error);
  });
}

function newChat(props, data, callback) {
  axios.post(getApiUrl(props) + "/chats/", data, {
    headers: getHeaders(props)
  }).then(function (response) {
    callback && callback(response.data);
  })["catch"](function (error) {
    console.log('New Chat Error', error);
  });
}

function getLatestChats(props, count, callback) {
  axios.get(getApiUrl(props) + "/chats/latest/" + count + "/", {
    headers: getHeaders(props)
  }).then(function (response) {
    props.onGetChats && props.onGetChats(response.data);
    callback && callback(response.data);
  })["catch"](function (error) {
    console.log('Fetch Chats Error', error);
  });
}

function getChatsBefore(props, before, count, callback) {
  axios.put(getApiUrl(props) + "/chats/latest/" + count + "/", {
    before: before
  }, {
    headers: getHeaders(props)
  }).then(function (response) {
    props.onGetChats && props.onGetChats(response.data);
    callback && callback(response.data);
  })["catch"](function (error) {
    console.log('Fetch Chats Before Error', error);
  });
}

function getOrCreateChat(props, data, callback) {
  axios.put(getApiUrl(props) + "/chats/", data, {
    headers: getHeaders(props)
  }).then(function (response) {
    callback && callback(response.data);
  })["catch"](function (error) {
    console.log('Get or Create Chat Error', error);
  });
}

function getChat(props, chatId, callback) {
  axios.get(getApiUrl(props) + "/chats/" + chatId + "/", {
    headers: getHeaders(props)
  }).then(function (response) {
    callback && callback(response.data);
  })["catch"](function (error) {
    console.log('Get Chat Error', error);
  });
}

function editChat(props, chatId, data, callback) {
  axios.patch(getApiUrl(props) + "/chats/" + chatId + "/", data, {
    headers: getHeaders(props)
  }).then(function (response) {
    callback && callback(response.data);
  })["catch"](function (error) {
    console.log('Edit Chat Error', error);
  });
}

function deleteChat(props, chatId, callback) {
  axios["delete"](getApiUrl(props) + "/chats/" + chatId + "/", {
    headers: getHeaders(props)
  }).then(function (response) {
    callback && callback(response.data);
  })["catch"](function (error) {
    console.log('Delete Chat Error', error);
  });
}

function addPerson(props, chatId, userName, callback) {
  axios.post(getApiUrl(props) + "/chats/" + chatId + "/people/", {
    username: userName
  }, {
    headers: getHeaders(props)
  }).then(function (response) {
    callback && callback(response.data);
  })["catch"](function (error) {
    console.log('New Person Error', error);
  });
}

function removePerson(props, chatId, userName, callback) {
  axios.put(getApiUrl(props) + "/chats/" + chatId + "/people/", {
    username: userName
  }, {
    headers: getHeaders(props)
  }).then(function (response) {
    callback && callback(response.data);
  })["catch"](function (error) {
    console.log('Delete Person Error', error);
  });
}

function getOtherPeople(props, chatId, successCallback, errorCallback) {
  axios.get(getApiUrl(props) + "/chats/" + chatId + "/others/", {
    headers: getHeaders(props)
  }).then(function (response) {
    props.onGetOtherPeople && props.onGetOtherPeople(chatId, response.data);
    successCallback && successCallback(chatId, response.data);
  })["catch"](function (error) {
    console.log('Fetch Other People Error', error);
    errorCallback && errorCallback();
  });
}

function getMyData(props, callback) {
  axios.get(getApiUrl(props) + "/users/me/", {
    headers: getHeaders(props)
  }).then(function (response) {
    callback && callback(response.data);
  })["catch"](function (error) {
    console.log('Get Myself Error', error);
  });
}

function editMyData(props, data, callback) {
  axios.patch(getApiUrl(props) + "/chats/me/", data, {
    headers: getHeaders(props)
  }).then(function (response) {
    callback && callback(response.data);
  })["catch"](function (error) {
    console.log('Edit Myself Error', error);
  });
}

function leaveChat(props, chatId, callback) {
  axios["delete"](getApiUrl(props) + "/chats/" + chatId + "/people/", {
    headers: getHeaders(props)
  }).then(function (response) {
    callback && callback(response.data);
  })["catch"](function (error) {
    console.log('Delete Person Error', error);
  });
}

function getMessages(props, chatId, callback) {
  axios.get(getApiUrl(props) + "/chats/" + chatId + "/messages/", {
    headers: getHeaders(props)
  }).then(function (response) {
    props.onGetMessages && props.onGetMessages(chatId, response.data);
    callback && callback(chatId, response.data);
  })["catch"](function (error) {
    console.log('Fetch Messages Error', error);
  });
}

function getLatestMessages(props, chatId, count, callback) {
  if (!getHeaders(props)) return;
  axios.get(getApiUrl(props) + "/chats/" + chatId + "/messages/latest/" + count + "/", {
    headers: getHeaders(props)
  }).then(function (response) {
    props.onGetMessages && props.onGetMessages(chatId, response.data);
    callback && callback(chatId, response.data);
  })["catch"](function (error) {
    console.log('Fetch Latest Messages Error', error);
  });
}

function sendMessage(props, chatId, data, callback) {
  var formdata = new FormData();
  if (data.attachments) {
    for (var i = 0; i < data.attachments.length; i++) {
      formdata.append('attachments', data.attachments[i], data.attachments[i].name);
    }
  } else if (data.files) {
    for (var _i = 0; _i < data.files.length; _i++) {
      formdata.append('attachments', data.files[_i], data.files[_i].name);
    }
  }
  formdata.append('text', data.text);
  formdata.append('sender_username', data.sender_username);
  formdata.append('custom_json', JSON.stringify(data.custom_json ? data.custom_json : {}));
  axios.post(getApiUrl(props) + "/chats/" + chatId + "/messages/", formdata, {
    headers: getHeaders(props)
  }).then(function (response) {
    callback && callback(response.data);
  })["catch"](function (error) {
    console.log('Send Messages Error', error);
  });
}

function getMessage(props, chatId, messageId, callback) {
  axios.get(getApiUrl(props) + "/chats/" + chatId + "/messages/" + messageId + "/", {
    headers: getHeaders(props)
  }).then(function (response) {
    callback && callback(chatId, response.data);
  })["catch"](function (error) {
    console.log('Fetch Message Error', error);
  });
}

function editMessage(props, chatId, messageId, data, callback) {
  axios.patch(getApiUrl(props) + "/chats/" + chatId + "/messages/" + messageId + "/", data, {
    headers: getHeaders(props)
  }).then(function (response) {
    callback && callback(response.data);
  })["catch"](function (error) {
    console.log('Delete Messages Error', error);
  });
}

function readMessage(props, chatId, messageId, callback) {
  axios.patch(getApiUrl(props) + "/chats/" + chatId + "/people/", {
    last_read: messageId
  }, {
    headers: getHeaders(props)
  }).then(function (response) {
    callback && callback(response.data);
  })["catch"](function (error) {
    console.log('Read Message Error', error);
  });
}

function deleteMessage(props, chatId, messageId, callback) {
  axios["delete"](getApiUrl(props) + "/chats/" + chatId + "/messages/" + messageId + "/", {
    headers: getHeaders(props)
  }).then(function (response) {
    callback && callback(response.data);
  })["catch"](function (error) {
    console.log('Delete Messages Error', error);
  });
}

function isTyping(props, chatId, callback) {
  axios.post(getApiUrl(props) + "/chats/" + chatId + "/typing/", {}, {
    headers: getHeaders(props)
  }).then(function (response) {
    callback && callback(response.data);
  })["catch"](function (error) {});
}

export { AutoCompleteInput, Avatar, Button, ChatCard$1 as ChatCard, ChatEngineApp as ChatEngine, ChatEngineContext, ChatEngineWrapper, ChatFeed, ChatHeader, ChatList, ChatSettings, ChatSettingsTop, ChatSocket, ConnectionBar, Dot, IceBreaker, IsTyping, Message$1 as MessageBubble, NewChatForm, NewMessageForm$1 as NewMessageForm, OptionsSettings, PeopleSettings, PhotosSettings, ScrollDownBar, Socket$1 as Socket, TextInput, addPerson, deleteChat, deleteMessage, editChat, editMessage, editMyData, getChat, getChats, getChatsBefore, getLatestChats, getLatestMessages, getMessage, getMessages, getMyData, getOrCreateChat, getOtherPeople, isTyping, leaveChat, newChat, readMessage, removePerson, sendMessage };
//# sourceMappingURL=index.modern.js.map
