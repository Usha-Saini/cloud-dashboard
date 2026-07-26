console.log("NEW CLOUD FILE LOADED");
const express = require("express");

const router = express.Router();

const {
    ec2Client,
    s3Client,
    lambdaClient,
    cloudWatchClient,
    costExplorerClient
} = require("../config/aws");

const {
    DescribeInstancesCommand
} = require("@aws-sdk/client-ec2");

const {
    ListBucketsCommand
} = require("@aws-sdk/client-s3");

const {
    ListFunctionsCommand
} = require("@aws-sdk/client-lambda");

const {
    GetMetricStatisticsCommand
} = require("@aws-sdk/client-cloudwatch");

const {
    GetCostAndUsageCommand
} = require("@aws-sdk/client-cost-explorer");


// =======================================
// AWS SERVICES DATA
// =======================================

router.get("/", async (req, res) => {

    try {

        // ======================
        // EC2
        // ======================

        const ec2Response = await ec2Client.send(
            new DescribeInstancesCommand({})
        );

        let ec2Count = 0;
        let instanceId = "N/A";
        let instanceState = "Stopped";

        ec2Response.Reservations.forEach(reservation => {

            reservation.Instances.forEach(instance => {

                if (instance.State.Name === "running") {

                    ec2Count++;

                    instanceId = instance.InstanceId;

                    instanceState = instance.State.Name;

                }

            });

        });


        // ======================
        // S3
        // ======================

        const s3Response = await s3Client.send(
            new ListBucketsCommand({})
        );

        const s3Count = s3Response.Buckets.length;


        // ======================
        // Lambda
        // ======================

        const lambdaResponse = await lambdaClient.send(
            new ListFunctionsCommand({})
        );

        const lambdaCount = lambdaResponse.Functions.length;


        // ======================
        // Cost Explorer
        // ======================

        let monthlyCost = "0.00";

        try {

            const today = new Date();

            const start = new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            );

            const end = new Date(
                today.getFullYear(),
                today.getMonth() + 1,
                1
            );

            const costResponse = await costExplorerClient.send(

                new GetCostAndUsageCommand({

                    TimePeriod: {

                        Start: start.toISOString().split("T")[0],

                        End: end.toISOString().split("T")[0]

                    },

                    Granularity: "MONTHLY",

                    Metrics: [

                        "UnblendedCost"

                    ]

                })

            );

            monthlyCost =
                costResponse.ResultsByTime[0]
                    ?.Total
                    ?.UnblendedCost
                    ?.Amount || "0.00";

        }

        catch (err) {

            console.log("Cost Explorer:", err.message);

        }


        res.json({

            ec2: ec2Count,

            s3: s3Count,

            lambda: lambdaCount,

            cost: monthlyCost,

            instanceId: instanceId,

            status: instanceState

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "AWS Data Fetch Failed"

        });

    }

});


// =======================================
// CLOUDWATCH CPU
// =======================================

router.get("/metrics", async (req, res) => {

    try {

        const ec2Response = await ec2Client.send(
            new DescribeInstancesCommand({})
        );


        let instanceId = null;


        for (const reservation of ec2Response.Reservations) {

            for (const instance of reservation.Instances) {

                if (instance.State.Name === "running") {

                    instanceId = instance.InstanceId;
                    break;

                }

            }

            if (instanceId) break;

        }



        if (!instanceId) {

            return res.json({

                cpu: 0,

                history: [],

                message: "No running EC2 instance found"

            });

        }



        const command = new GetMetricStatisticsCommand({

            Namespace: "AWS/EC2",

            MetricName: "CPUUtilization",

            Dimensions: [

                {
                    Name: "InstanceId",
                    Value: instanceId
                }

            ],

            StartTime: new Date(Date.now() - 3600 * 1000),

            EndTime: new Date(),

            Period: 300,

            Statistics: [

                "Average"

            ]

        });



        const response = await cloudWatchClient.send(command);



        let cpu = 0;



        if (response.Datapoints.length > 0) {

            cpu = Math.round(
                response.Datapoints[0].Average
            );

        }


console.log("HISTORY CODE RUNNING");
        res.json({

            instanceId: instanceId,

            cpu: cpu,

            history: [

                Math.max(cpu - 10, 0),

                Math.max(cpu - 5, 0),

                cpu,

                Math.min(cpu + 5, 100),

                Math.min(cpu + 10, 100)

            ]

        });


    }

    catch(error) {

        console.log(error);


        res.status(500).json({

            message: "CloudWatch Fetch Failed"

        });

    }

});


module.exports = router;