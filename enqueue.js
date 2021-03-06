'use strict';
const AWS = require('aws-sdk');
const config = require('./config');
AWS.config.update({region: 'us-east-1'})
const sqs = new AWS.SQS({apiVersion:'2022-04-20'});

const numMessages =10000;
const queueURL = config.queueURL;

function enqueue(params) {
    sqs.sendMessage(params, (err, data) => {
        if(err){
            console.log("Error", err);
        }else {
            console.log("Success", data.MessageId);
        }
    });
}


// in order to put a significunt number of id at a time to the system
for(let i = 0; i < numMessages; i++){
    let params = {
    
         MessageBody: `{ "id": ${String(i)}}`,   
         QueueUrl: queueURL
    };
    enqueue(params);
}