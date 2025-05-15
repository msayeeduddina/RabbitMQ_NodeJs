Absolutely! Here’s a **professional, concise README** that focuses on setup, usage, and operational steps-**without including the code**.

---

# RabbitMQ Node.js Publisher & Consumer

A robust example of using RabbitMQ with Node.js for message publishing and consumption. This project includes scripts for both publishing and consuming messages, as well as a Docker Compose configuration for running RabbitMQ locally.

---

## Features

- Publisher and consumer scripts with modern error handling
- Docker Compose setup for RabbitMQ with management UI
- Environment variable support for flexible configuration

---

## Prerequisites

- Node.js (v14+ recommended)
- npm
- Docker & Docker Compose

---

## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine.

### 2. Start RabbitMQ with Docker Compose

Run the following command in the project directory to start RabbitMQ and its management UI:

```sh
docker compose up -d
```

- **AMQP protocol:** `amqp://localhost:5672`
- **Management UI:** [http://localhost:15672](http://localhost:15672)
  - Default login: `guest` / `guest`

### 3. Install Node.js Dependencies

In your project directory, install the required Node.js packages:

```sh
npm install amqplib
```

### 4. Configure Environment (Optional)

You can set the RabbitMQ connection URL using the `RABBITMQ_URL` environment variable:

```sh
export RABBITMQ_URL=amqp://localhost:5672
```

### 5. Run the Consumer

Open a terminal and start the consumer script. This script will listen for messages on the specified queue.

```sh
node consumer.js
```

### 6. Run the Publisher

In a separate terminal, run the publisher script to send a message to the queue.

```sh
node publisher.js
```

You should see confirmation messages in both terminals indicating successful message sending and receipt.

---

## RabbitMQ Management UI

You can monitor queues and messages using the RabbitMQ Management UI at [http://localhost:15672](http://localhost:15672).

- **Username:** `guest`
- **Password:** `guest`

---

## Stopping RabbitMQ

To stop the RabbitMQ service, run:

```sh
docker-compose -f docker-compose.yml rm -s -f -v
```

---

## Troubleshooting

- **Connection Errors:** Ensure RabbitMQ is running and accessible on port 5672.
- **Firewall Issues:** Make sure required ports are open.
- **Docker Networking:** If running scripts inside Docker, use `rabbitmq` as the hostname.

---

## License

MIT License

---

**Happy Messaging! 🚀**

---