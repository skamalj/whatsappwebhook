// @! create readme based on included code include=whatsapp-webhook/app.mjs include=template.yaml provider=anthropic

# WhatsApp Webhook Lambda Function

This project implements a serverless WhatsApp webhook handler using AWS Lambda, API Gateway, and SQS. It's designed to receive and process WhatsApp messages through Meta's WhatsApp Business API.

## Architecture

The solution consists of the following AWS components:

- **AWS Lambda**: Handles incoming webhook requests
- **API Gateway**: Exposes the webhook endpoint
- **SQS Queue**: Stores received messages for further processing
- **Secrets Manager**: Stores the WhatsApp verification token

## Features

- WhatsApp webhook verification endpoint (GET)
- Message receiving endpoint (POST)
- Automatic message queueing to SQS
- Secure token verification

## Prerequisites

- AWS SAM CLI
- Node.js 22.x
- AWS CLI configured with appropriate credentials
- WhatsApp Business API access

## Configuration

### Environment Variables

- `WHATSAPP_TOKEN`: WhatsApp verification token (stored in AWS Secrets Manager)
- `SQS_QUEUE_URL`: URL of the SQS queue (automatically configured)
- `AWS_REGION`: AWS region for the SQS client

### AWS Resources

The following resources are created via the SAM template:

- Lambda function with necessary IAM roles
- API Gateway endpoints
- SQS queue named 'WhatsAppQueue'
- Required IAM policies for SQS and Secrets Manager access

## Deployment

1. Clone the repository
2. Create a secret in AWS Secrets Manager with your WhatsApp verification token
3. Deploy using SAM:

bash
sam build
sam deploy --guided


During deployment, you'll need to provide:
- Stack name
- AWS Region
- WhatsAppTokenSecret name

## API Endpoints

### GET /hello
Used for webhook verification by Meta's WhatsApp Business Platform.

### POST /hello
Receives incoming WhatsApp messages and queues them to SQS.

## Error Handling

The application includes error handling for:
- Invalid webhook verification attempts
- Message parsing errors
- SQS publishing failures

## Monitoring

The application logs the following events to CloudWatch:
- Received WhatsApp messages
- Successful SQS message publications
- Error events

## Security

- Webhook verification using secure tokens
- IAM role-based access control
- Secrets management using AWS Secrets Manager

## Contributing

Contributions are welcome! Please submit pull requests for any enhancements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.