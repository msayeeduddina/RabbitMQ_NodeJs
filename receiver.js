const amqp = require("amqplib/callback_api");

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost:5672";
const QUEUE_NAME = "hello";

amqp.connect(RABBITMQ_URL, function (error0, connection) {
  if (error0) {
    console.error("Failed to connect to RabbitMQ:", error0.message);
    process.exit(1);
  }

  connection.createChannel(function (error1, channel) {
    if (error1) {
      console.error("Failed to create channel:", error1.message);
      connection.close();
      process.exit(1);
    }

    channel.assertQueue(QUEUE_NAME, { durable: false }, function (err2, _ok) {
      if (err2) {
        console.error("Failed to assert queue:", err2.message);
        channel.close();
        connection.close();
        process.exit(1);
      }

      console.log(
        ` [*] Waiting for messages in "${QUEUE_NAME}". To exit press CTRL+C`
      );

      channel.consume(
        QUEUE_NAME,
        function (msg) {
          if (msg !== null) {
            console.log(` [x] Received: "${msg.content.toString()}"`);
          } else {
            console.warn(" [!] Received null message");
          }
        },
        { noAck: true }
      );
    });
  });

  // Graceful shutdown on SIGINT (Ctrl+C)
  process.on("SIGINT", () => {
    console.log("\nGracefully shutting down...");
    connection.close(() => {
      process.exit(0);
    });
  });
});
