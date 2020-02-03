import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda'
import DynamoDB from 'aws-sdk/clients/dynamodb'

const ddb = new DynamoDB.DocumentClient()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const body = JSON.parse(event.body)
  const catId = `${body.catId}`
  const cartId = event.pathParameters.cartId

  console.log(`Adding ${body.quantity} to ${body.catId} for Cart ID: ${cartId}`)

  const cartItem = await ddb
    .get({
      TableName: process.env.TABLE ?? 'rent-a-cat-dev-table',
      Key: {
        PK: `${cartId}#cart`,
        SK: catId
      }
    })
    .promise()

  if (cartItem.Item) {
    await ddb
      .update({
        TableName: process.env.TABLE ?? 'rent-a-cat-dev-table',
        Key: {
          PK: `${cartId}#cart`,
          SK: catId
        },
        UpdateExpression: `ADD quantity :q`,
        ExpressionAttributeValues: {
          ':q': body.quantity
        }
      })
      .promise()
  } else {
    await ddb
      .put({
        TableName: process.env.TABLE ?? 'rent-a-cat-dev-table',
        Item: {
          PK: `${cartId}#cart`,
          SK: catId,
          quantity: 1
        }
      })
      .promise()
  }

  return {
    statusCode: 202, // accepted
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }
}
