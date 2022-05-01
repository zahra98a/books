'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  // test 

  //const params = {
  //  TableName: "Products",
  //  Item: {
  //    id: '123',
  //    productname: 'AWS Book'
  //  }
  //};

  const { id, productname } = JSON.parse(event.body);

  const params = {
    TableName: "Products",
    Item: {
      id: id,
      productname: productname
    }
  };
//create or add new books to DynamoDB
  try {
    const data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch(err) {
    responseBody = `Unable to add item: ${err}`;
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