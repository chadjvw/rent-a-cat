import { APIGatewayProxyHandler } from 'aws-lambda'
import DynamoDB from 'aws-sdk/clients/dynamodb'

const ddb = new DynamoDB.DocumentClient()

export const handler: APIGatewayProxyHandler = async () => {
  const catResult = await ddb
    .query({
      TableName: process.env.TABLE ?? 'rent-a-cat-dev-table',
      KeyConditionExpression: `PK = :cat`,
      ExpressionAttributeValues: {
        ':cat': 'cat'
      }
    })
    .promise()

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(catResult.Items, null, 2)
  }
}
