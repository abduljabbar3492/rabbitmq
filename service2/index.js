const express = require("express");
const app = express();
const amqp = require("amqplib");
const rabbitSettings = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'rabbit-user',
    password: 'Asd@1234',
    vhost: '/',
    authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
}
var connection, channel;
var queue = "employees";
connect();
async function connect() {
    try {
        connection = await amqp.connect(rabbitSettings);
        channel = await connection.createChannel();
        var q = await channel.assertQueue(queue);
        let data = {
            name: "Abdu",
            salary: 16000
        }
        channel.consume(queue, (data) => {
            console.log(data.content.toString())
            channel.ack(data);
        })
    } catch (error) {
        console.log(error);
    }
}




app.listen("5001", () => {
 console.log("Server is running in 5002")
});