var ReconnectingWebSocket = require('ReconnectingWebSocket');
export const socket = new ReconnectingWebSocket(
  `${window.location.origin.replace('http', 'ws')}/ws`
);

socket.onopen = function() {
  //console.log('on open');
};

socket.onclose = function() {
  //console.log('on close');
};

