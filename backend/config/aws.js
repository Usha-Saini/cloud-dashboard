const { EC2Client } = require("@aws-sdk/client-ec2");
const { S3Client } = require("@aws-sdk/client-s3");
const { LambdaClient } = require("@aws-sdk/client-lambda");
const { CloudWatchClient } = require("@aws-sdk/client-cloudwatch");
const { CostExplorerClient } = require("@aws-sdk/client-cost-explorer");

const region = "ap-south-1";

const ec2Client = new EC2Client({
    region
});

const s3Client = new S3Client({
    region
});

const lambdaClient = new LambdaClient({
    region
});

const cloudWatchClient = new CloudWatchClient({
    region
});

// Cost Explorer always uses us-east-1
const costExplorerClient = new CostExplorerClient({
    region: "us-east-1"
});

module.exports = {
    ec2Client,
    s3Client,
    lambdaClient,
    cloudWatchClient,
    costExplorerClient
};