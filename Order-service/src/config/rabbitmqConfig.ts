import 'dotenv/config'

export default {
    rabbitMQ:{
        url: String(process.env.RABBITMQ_CLOUD_URL),
            queues:{
            orderQueue: "order_queue"
        }
    }
}