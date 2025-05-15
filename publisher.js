const amqp = require("amqplib");

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost:5672";
const QUEUE_NAME = "hello";

async function publishMessage() {
  let connection;
  try {
    // Connect to RabbitMQ
    connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Ensure the queue exists
    await channel.assertQueue(QUEUE_NAME, { durable: false });

    // Prepare message
    const timestamp = new Date().toISOString();
    const msg = `Hello World! ${timestamp}`;

    // Send message
    channel.sendToQueue(QUEUE_NAME, Buffer.from(msg));
    console.log(`[x] Sent: "${msg}" to queue "${QUEUE_NAME}"`);

    // Close connection after a short delay to ensure message is sent
    setTimeout(async () => {
      try {
        await channel.close();
        await connection.close();
        process.exit(0);
      } catch (closeErr) {
        console.error("Error closing channel/connection:", closeErr);
        process.exit(1);
      }
    }, 500);
  } catch (err) {
    console.error("RabbitMQ error:", err.message);
    if (connection) {
      try {
        await connection.close();
      } catch (closeErr) {
        console.error("Error closing connection after failure:", closeErr);
      }
    }
    process.exit(1);
  }
}

// Run the publisher
publishMessage();
