import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda'
import { getCart } from '../utils.ts'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  let returnArray = []

  try {
    const cartItems = await getCart(event.pathParameters.cartId)

    console.log(cartItems)

    const cartItemsArray = cartItems.Items.map(i => Array(i.quantity).fill(Number(i.SK)))

    console.log(cartItemsArray)

    returnArray = cartItemsArray.flat()
  } catch (e) {
    // if there is no cart, then there are no items in it
    console.log(e)
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(returnArray, null, 2)
  }
}
