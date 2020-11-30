const kafkaInstance = require('./kafkaInstance');

let consumer = null;
const createConsumer = async () => {
  consumer = kafkaInstance.consumer({
    groupId: 'test-group',
  });
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({ value: message.value.toString() });
    },
  });
};

let consumer2 = null;
const createConsumer2 = async () => {
  consumer2 = kafkaInstance.consumer({
    groupId: 'test-group',
  });
  await consumer2.connect();
  await consumer.subscribe({ topic: 'test-topic2', fromBeginning: true });

  await consumer2.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({ value: message.value.toString() });
    },
  });
};

createConsumer();
createConsumer2();

module.exports = {
  consumer,
  consumer2,
};
