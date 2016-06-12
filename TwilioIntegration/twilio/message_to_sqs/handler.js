'use strict';

var QUEUE_URL = 'https://sqs.us-west-2.amazonaws.com/966826486976/sms_to_sqs_queue';
var AWS = require('aws-sdk');
var sqs = new AWS.SQS({
	region : 'us-west-2'
});

function parseQuery(qstr) {
	var query = {};
	var a = qstr.substr(0).split('&');
	for (var i = 0; i < a.length; i++) {
		var b = a[i].split('=');
		query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
	}
	return query;
}
module.exports.handler = function(event, context) {

	console.log('this is my message3');
	console.log(event);
	var qryObject = parseQuery(event.reqbody);
	console.log('json');
	console.log(qryObject);
	console.log(qryObject['Body']);

	var params = {
		MessageBody : JSON.stringify(qryObject),
		QueueUrl : QUEUE_URL
	};

	sqs
		.sendMessage(
			params,
			function(err, data) {
				if (err) {
					console.log('error:', "Fail Send Message" + err);
					context.done('error', "ERROR Put SQS"); // ERROR with
					// message
					// ERROR with message
				} else {
					console.log('data:', data.MessageId);
					// context.done(null,''); // SUCCESS

					var output = '<?xml version="1.0" encoding="UTF-8"?><Response><Pause length="2"/><Say>Hello Amazon, this is Twilio powered by Lambda</Say></Response>';
					// context.succeed(output);
					context.succeed(output);
				}
			});

};
