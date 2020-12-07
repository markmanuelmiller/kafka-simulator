const path = require('path');
const express = require('express');
const kafkaController = require('./controllers/kafkaController');
const kafka = require('./kafka/kafkaInstance');

const app = express();
const kafkaInstance = kafka.kafka;
console.log(`-------------------------------`);
console.log(kafkaInstance);
console.log(`-------------------------------`);

app.use(express.json());

app.use('/', express.static(path.join(__dirname, '../client/')));

app.use('/api/k/:action', kafkaController.create, (req, res) => {
  return res.status(200).json(res.locals.payload);
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
