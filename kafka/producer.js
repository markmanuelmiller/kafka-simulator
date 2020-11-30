// const util = require('util');
// const setIntervalPromise = util.promisify(setInterval);

const kafkaInstance = require('./kafkaInstance');

let producer = null;
let producer2 = null;

const createProducer = async () => {
  producer = kafkaInstance.producer();
  await producer.connect();
  await producer.send({
    topic: 'test-topic',
    messages: [{ value: 'Hello Kafkajs!', partition: 2 }],
  });
};
const createProducer2 = async () => {
  producer2 = kafkaInstance.producer();
  await producer2.connect();
  await producer2.send({
    topic: 'test-topic2',
    messages: [{ value: 'Hello Kafkajs!' }],
  });
};

createProducer();
createProducer2();

let counter = 0;
async function createNewEvent() {
  const date = new Date();

  if (counter % 10 === 0) {
    producer.send({
      topic: 'test-topic',
      messages: [
        { value: `save to database ${counter}`, key: '2', partition: 2 },
        { value: `save to database2 ${counter}`, key: '1', partition: 1 },
      ],
    });
  } else {
    producer.send({
      topic: 'test-topic2',
      messages: [{ value: date.toString() + ' ' + counter }],
    });
  }
  counter++;
}

setInterval(createNewEvent, 100);

module.exports = {
  producer,
  producer2,
};
