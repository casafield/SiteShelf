import {DynamoDBClient, QueryCommand} from '@aws-sdk/client-dynamodb';
import {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION} from '@env';
// To avoid the aws-sdk error
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {v4 as uuidv4} from 'uuid';

const awsConfig = {
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
};
const ddbClient = new DynamoDBClient(awsConfig);

export const getDynamoDBData = (parent_id: string) => {
  const params = {
    TableName: 'SITE_SHELF_ITEM',
    KeyConditionExpression: 'parent_id = :s',
    ExpressionAttributeValues: {
      ':s': {S: parent_id},
    },
  };

  return ddbClient.send(new QueryCommand(params));
};

export default {getDynamoDBData};
