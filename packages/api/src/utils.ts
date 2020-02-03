import DynamoDB from 'aws-sdk/clients/dynamodb'

const ddb = new DynamoDB.DocumentClient()

export function getCart(cartId: string): Promise<any> {
  // ideally, we would check for 'LastEvaluatedKey' and keep looping until we got all the cart items
  return ddb
    .query({
      TableName: process.env.TABLE ?? 'rent-a-cat-dev-table',
      KeyConditionExpression: 'PK = :cart',
      ExpressionAttributeValues: {
        ':cart': `${cartId}#cart`
      }
    })
    .promise()
}