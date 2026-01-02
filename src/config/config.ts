export default () => ({
  elasticsearch: {
    url: process.env.ELASTICSEARCH_URL,
  },
  rabbitmq: {
    uri: process.env.RABBITMQ_URI,
  },
});
