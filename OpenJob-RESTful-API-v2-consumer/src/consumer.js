import 'dotenv/config';
import amqp from 'amqplib';
import ApplicationsService from './ApplicationsService.js';
import MailSender from './MailSender.js';
import Listener from './listener.js';

const init = async () => {
    const applicationsService = new ApplicationsService();
    const mailSender = new MailSender();
    const listener = new Listener(applicationsService, mailSender);

    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();

    await channel.assertQueue('process:application', {
        durable: true,
    });

    channel.consume('process:application', listener.listen, { noAck: true });
};

init();