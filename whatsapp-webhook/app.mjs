
export async function lambdaHandler(event, context) {
    if (event.httpMethod === "GET") {
        // Webhook verification (for Meta challenge response)
        const query = event.queryStringParameters;
        if (query["hub.mode"] === "subscribe" && query["hub.verify_token"] === process.env.WHATSAPP_TOKEN) {
            return {
                statusCode: 200,
                body: query["hub.challenge"],
            };
        } else {
            return { statusCode: 403, body: "Verification failed" };
        }
    }

    if (event.httpMethod === "POST") {
        try {
            const body = JSON.parse(event.body);
            await sendMessageToSQS(body);
            console.log("Received WhatsApp Message:", JSON.stringify(body, null, 2));

            return { statusCode: 200, body: "EVENT_RECEIVED" };
        } catch (error) {
            console.error("Error processing webhook:", error);
            return { statusCode: 400, body: "Invalid request" };
        }
    }

    return { statusCode: 405, body: "Method Not Allowed" };
};

// @! create function which accepts json messages and writes to SQS using javascript v3

import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

const sqsClient = new SQSClient({ region: process.env.AWS_REGION });

export async function sendMessageToSQS(message) {
    const params = {
        QueueUrl: process.env.SQS_QUEUE_URL,
        MessageBody: JSON.stringify(message)
    };

    try {
        const command = new SendMessageCommand(params);
        const result = await sqsClient.send(command);
        console.log('Message sent to SQS:', result.MessageId);
        return result;
    } catch (error) {
        console.error('Error sending message to SQS:', error);
        throw error;
    }
}