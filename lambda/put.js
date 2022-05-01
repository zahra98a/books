'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const { id, bookname } = JSON.parse(event.body);


  // test 
  const params = {
    TableName: "Library",
    Item: {
      id: '123',
      bookname: 'AWS Book'
    }
  };

 // const params = {
 //   TableName: "Books",
 //   Item: {
 //     id: id,
 //     bookname: bookname
//    }
//  };
//create or add new books to DynamoDB
  try {
    const data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch(err) {
    responseBody = `Unable to add book: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: responseBody
  };

  return response;
};