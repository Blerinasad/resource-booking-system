const kafkaClient = {
  connected: false,

  async connect() {
    this.connected = true;
    console.log("Kafka placeholder connected");
  },

  async publish(topic, payload) {
    console.log(`[KAFKA EVENT] ${topic}`, payload);
  },
};

export default kafkaClient;
