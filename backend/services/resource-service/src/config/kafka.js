import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || "resource-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:29092"],
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({
  groupId: `${process.env.KAFKA_CLIENT_ID || "resource-service"}-group`,
});

export const connectProducer = async () => {
  try {
    await producer.connect();
    console.log("Kafka producer connected");
  } catch (error) {
    console.log("Kafka producer not connected:", error.message);
  }
};

export const publishEvent = async (topic, payload) => {
  try {
    await producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(payload),
        },
      ],
    });

    console.log(`Kafka event published: ${topic}`);
  } catch (error) {
    console.log(`Kafka publish failed: ${error.message}`);
  }
};

export const connectConsumer = async (topics = [], handler) => {
  try {
    await consumer.connect();

    for (const topic of topics) {
      await consumer.subscribe({
        topic,
        fromBeginning: false,
      });
    }

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        const payload = JSON.parse(message.value.toString());
        await handler(topic, payload);
      },
    });

    console.log("Kafka consumer connected");
  } catch (error) {
    console.log("Kafka consumer not connected:", error.message);
  }
};