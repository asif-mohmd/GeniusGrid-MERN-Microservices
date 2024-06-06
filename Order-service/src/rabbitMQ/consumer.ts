import { Channel, ConsumeMessage } from "amqplib";
import MessageHandler from "./messageHandler";

export default class Consumer {

  constructor(private channel: Channel, private rpcQueue: string) { }

  async consumeMesssages() {
    console.log("ready to consume messages..")

    this.channel.consume(this.rpcQueue, async (message: ConsumeMessage | null) => {
      if (message) {
        const { correlationId, replyTo } = message.properties;
        const headers = message.properties.headers;
        if (!correlationId || !replyTo || !headers) {
          console.log("Missing some properties")
        } else {
          const operation = headers.function;
          await MessageHandler.handle(operation, JSON.parse(message.content.toString()),
            correlationId,
            replyTo)
        }
      } else {
        console.log("No message received");
      }

    }, {
      noAck: true
    })

  }



}
