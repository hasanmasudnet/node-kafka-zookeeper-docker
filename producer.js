const { Kafka, Partitioners } = require('kafkajs');

// Create a Kafka instance
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'], // Kafka broker address
});

// Create a Kafka producer using the legacy partitioner
const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

const runProducer = async () => {
  await producer.connect(); // Connect to Kafka

  // Send a message to 'test-topic'
  const message = process.argv[2]; // Get input message from command-line arguments
  await producer.send({
    topic: 'test-topic',
    messages: [{ value: message }],
  });

  console.log(`Produced message: ${message}`);
  await producer.disconnect(); // Disconnect the producer
};

runProducer().catch(console.error);
