import ApplicationRepositories from "../repositories/application-repositories.js";
import JobRepositories from "../../jobs/repositories/job-repositories.js";
import amqp from 'amqplib';

const ApplicationService = {
    sendMessage: async (queue, message) => {
        const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
        const channel = await connection.createChannel();
        await channel.assertQueue('process:application', {
            durable: true,
        });

        await channel.sendToQueue(queue, Buffer.from(message));

        setTimeout(() => {
            connection.close();
        }, 1000);
    },
};

export default ApplicationService;