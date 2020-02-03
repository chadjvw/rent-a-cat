import { APIGatewayProxyHandler } from 'aws-lambda'
import DynamoDB from 'aws-sdk/clients/dynamodb'

const ddb = new DynamoDB.DocumentClient()

export const handler: APIGatewayProxyHandler = async () => {
  const dbCats = [
    {
      PK: 'cat',
      SK: '1',
      image: 'https://source.unsplash.com/512x288/?cat,brown',
      type: 'Brown Tabby',
      dailyPrice: 1,
      description: 'Super nice cat'
    },
    {
      PK: 'cat',
      SK: '2',
      image: 'https://source.unsplash.com/512x288/?cat,orange',
      type: 'Orange Tabby',
      dailyPrice: 1.5,
      description: 'Pretty good cat'
    },
    {
      PK: 'cat',
      SK: '3',
      image: 'https://source.unsplash.com/512x288/?cat,white',
      type: 'White Cat',
      dailyPrice: 5,
      description: 'Not very nice'
    },
    {
      PK: 'cat',
      SK: '4',
      image: 'https://source.unsplash.com/512x288/?cat,black',
      type: 'Black Cat',
      dailyPrice: 4.32,
      description: 'Best cat ever'
    },
    {
      PK: 'cat',
      SK: '5',
      image: 'https://source.unsplash.com/512x288/?cat,calico',
      type: 'Calico',
      dailyPrice: 1.1,
      description: 'Very cuddly'
    },
    {
      PK: 'cat',
      SK: '6',
      image: 'https://source.unsplash.com/512x288/?lion',
      type: 'Male Lion',
      dailyPrice: 150,
      description: 'Bitey'
    },
    {
      PK: 'cat',
      SK: '7',
      image: 'https://source.unsplash.com/512x288/?lion',
      type: 'Female Lion',
      dailyPrice: 54.3,
      description: 'A true Lioness'
    },
    {
      PK: 'cat',
      SK: '8',
      image: 'https://source.unsplash.com/512x288/?cat,gray',
      type: 'Gray Cat',
      dailyPrice: 2.37,
      description: 'Loves sitting on laps'
    },
    {
      PK: 'cat',
      SK: '9',
      image: 'https://source.unsplash.com/512x288/?cat,black',
      type: 'Tortoiseshell',
      dailyPrice: 1.89,
      description: 'Doesnt shed'
    },
    {
      PK: 'cat',
      SK: '10',
      image: 'https://source.unsplash.com/512x288/?cat,gray',
      type: 'Gray Tabby',
      dailyPrice: 4.38,
      description: 'Will do anything for milk'
    },
    {
      PK: 'cat',
      SK: '11',
      image: 'https://source.unsplash.com/512x288/?cat,white',
      type: 'Another White Cat',
      dailyPrice: 7.36,
      description: 'Much better than the other guy'
    },
    {
      PK: 'cat',
      SK: '12',
      image: 'https://source.unsplash.com/512x288/?cat,siamese',
      type: 'Siamese',
      dailyPrice: 15.24,
      description: 'Starred in Aristacats'
    },
    {
      PK: 'cat',
      SK: '13',
      image: 'https://source.unsplash.com/512x288/?mountian,lion',
      type: 'Mountian Lion',
      dailyPrice: 73.98,
      description: 'Loves mutton'
    },
    {
      PK: 'cat',
      SK: '14',
      image: 'https://source.unsplash.com/512x288/?maine,coon,cat',
      type: 'Maine Coon',
      dailyPrice: 17.03,
      description: 'You wont believe how big he is'
    },
    {
      PK: 'cat',
      SK: '15',
      image: 'https://source.unsplash.com/512x288/?cat,white,ragdoll',
      type: 'Ragdoll',
      dailyPrice: 14.07,
      description: 'Smaller than the Maine Coon'
    },
    {
      PK: 'cat',
      SK: '16',
      image: 'https://source.unsplash.com/512x288/?cat,black',
      type: 'Black Cat',
      dailyPrice: 7.22,
      description: 'Starred on Sabrina'
    }
  ]

  const dbCatsPromises = dbCats.map(d => {
    return ddb
      .put({
        TableName: process.env.TABLE ?? 'rent-a-cat-dev-table',
        Item: d
      })
      .promise()
  })

  await Promise.all(dbCatsPromises)

  return {
    statusCode: 201 // created
  }
}
