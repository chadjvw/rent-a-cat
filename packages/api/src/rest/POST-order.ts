import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda'
import DynamoDB from 'aws-sdk/clients/dynamodb'
import { getCart } from '../utils.ts'

const ddb = new DynamoDB.DocumentClient()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const body = JSON.parse(event.body)

  const cartItems = await getCart(body.cartId)

  console.log(cartItems)

  if (!cartItems.Items) {
    throw new Error('Unable to locate items for cart: ' + body.cartId)
  }

  const orderTime = new Date().toISOString()
  const orderItems = cartItems.Items.map(i => {
    return {
      catId: Number(i.SK),
      quantity: i.quantity
    }
  })

  // create the order in the database
  // await the order being created before we do anything else
  const order = await ddb
    .put({
      TableName: process.env.TABLE ?? 'rent-a-cat-dev-table',
      Item: {
        PK: `${body.cartId}#order`,
        SK: orderTime,
        items: orderItems
      }
    })
    .promise()

  // here is where we would start a step function to track an order from credit card processing
  // to sending the order to vendor, to shipment to delivery
  // last step in step function would be to add a TTL to the ddb item to expire it afer x days
  const sfPromise = Promise.resolve(
    'arn:${Partition}:states:${Region}:${Account}:execution:${StateMachineName}:${ExecutionId}'
  )

  // empty out the cart in the database
  const emptyCartPromises = cartItems.Items.map(i => {
    return ddb
      .delete({
        TableName: process.env.TABLE ?? 'rent-a-cat-dev-table',
        Key: {
          PK: `${body.cartId}#cart`,
          SK: i.SK
        }
      })
      .promise()
  })

  // update order with Step function ARN
  const addSfPromise = ddb
    .update({
      TableName: process.env.TABLE ?? 'rent-a-cat-dev-table',
      Key: {
        PK: `${body.cartId}#order`,
        SK: orderTime
      },
      UpdateExpression: `set stepFunctionArn = :arn`,
      ExpressionAttributeValues: {
        ':arn': await sfPromise
      }
    })
    .promise()

  await Promise.all([addSfPromise, ...emptyCartPromises])

  return {
    statusCode: 201, // created
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(
      {
        orderNumber: orderTime,
        orderItems
      },
      null,
      2
    )
  }
}
