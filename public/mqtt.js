var subTopic = '';
var clientName = 'WebClient' + parseInt(Math.random() * 100000000).toString();
var connected_flag = 0;
var mqtt;
var reconnectTimeout = 2000;
var host = 'web.chciw.com.tw';
var port = 1884;


function onConnectionLost() {
	console.log('connection lost');
	connected_flag = 0;
}
function onFailure(message) {
	console.log('Failed' + message);
	setTimeout(MQTTConnect, reconnectTimeout);
}
function onConnected(recon, url) {
	console.log(' in onConnected ' + recon + url);
}
function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	//document.getElementById('messages').innerHTML ='Connected to '+host +'on port '+port;
	connected_flag = 1;
	console.log('Connect to mqtt');
	sub_topics();

}
function MQTTConnect() {
	mqtt = new Paho.MQTT.Client(host, port, clientName);
	options = {
		timeout: 3,
		onSuccess: onConnect,
		onFailure: onFailure,
	};

	mqtt.onConnectionLost = onConnectionLost;
	mqtt.onMessageArrived = onMessageArrived;
	mqtt.onConnected = onConnected;
	mqtt.connect(options);
	return false;
}


function sub_topics() {
	if (connected_flag == 0) {
		var out_msg = 'Not Connected so cannot subscribe';
		console.log(out_msg);
		return false;
	}
	mqtt.subscribe(subTopic);

	return false;
}