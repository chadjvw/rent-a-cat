# Rent-A-Cat

## Deployment

### Dependencies

- [NodeJS](https://nodejs.org/en/download/)
- [Classic Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Serverless Framework CLI](https://serverless.com/framework/docs/providers/aws/guide/installation/)

### Deployment Steps

#### Deploy API

1. Clone the `rent-a-cat` repository
2. Execute `yarn install` inside the directory
3. `cd` into the `packages/api` directory
4. Execute `sls deploy --verbose --aws-profile <AWS CLI Profile to use for deployment> --region <AWS region to use for deployment>`
5. Wait for deployment to finish
6. Copy the `ServiceEndpoint` URL from the `Stack Outputs` section
7. Execute `curl <Service Endpoint URL>/api/populate`

#### Deploy Website

1. `cd` into the `packages/web` directory
2. Open the `.env` file and replace `<Service Endpoint URL>` with the Service Endpoint URL from the previous deployment
3. Execute `sls deploy --verbose --aws-profile <AWS CLI Profile to use for deployment> --region <AWS region to use for deployment>`
4. Wait for deployment to finish
5. If the depolyment fails with an exception stating that a bucket with that name already exists rerun the deploy command with the `--stage <new stage name>`
6. Copy the `RentACatWebsiteURL` from the `Stack Outputs` section
7. Open the URL in a browser

## How the Site Works

When a user of Rent-a-Cat loads up the webpage, they are given a random ID for their cart. Users can then browse the selection of cats for renting and add them to their cart.
When a cat is added to a cart, this information is immediately sent to a DyanamoDB table via API Gateway for storage. The same happens if the quantity of cats to be rented is updated.
If a user navigates away from the website without completing their order, the cart state will be saved for when they come back to the website. Once a user comes back, the database is
queried for their previous cart contents. Users can modify the quantity of cats they desire to rent on the cart screen before pressing the order button.

If a user clicks the 'Order' button, the contents of their cart is copied into an order object and a Step Function is started to handle tracking payment, order processing, shipping, etc.
Their cart information is cleared out of the database, and the ARN of the Step Function is added to the order so current status can be returned to the user if requestd.
