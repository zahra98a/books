'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;


  // test
  /*
  const params = {
    TableName: "Library",
    Key: {
      id: '123'
    },
    UpdateExpression: "set bookname = :n",    //update the name of the book
    ExpressionAttributeValues: {
      ":n": "AWS Cloud Book"
    },
    ReturnValues: "UPDATED_NEW"
  }; */

  const { id, bookname } = JSON.parse(event.body);

  const params = {
    TableName: "Library",
    Key: {
      id: id
    },
    UpdateExpression: "set bookname = :n",    //update the name of the book
    ExpressionAttributeValues: {
      ":n": bookname
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const data = await documentClient.update(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204;
  } catch(err) {
    responseBody = `Unable to update book: ${err}`;
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
