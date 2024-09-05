const { Kafka } = require('kafkajs');

// Create a Kafka instance
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'], // Kafka broker address
});

// Create a Kafka consumer
const consumer = kafka.consumer({ groupId: 'test-group' });

const runConsumer = async () => {
  await consumer.connect(); // Connect to Kafka
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true }); // Subscribe to 'test-topic'

  // Run the consumer to receive messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(), // Convert message from Buffer to String
      });
    },
  });
};

runConsumer().catch(console.error);
