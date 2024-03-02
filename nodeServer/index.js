const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const {buildSchema} = require("graphql");
const Message = require("./models/Message");

const schema = buildSchema(`
    
    type Query {
        getAllMessages: [Message]
        getMessage(id: ID!): Message
    }

    type Mutation {
        createMessage(input: MessageInput): Message
        updateMessage(id: ID!, input: MessageInput): Message
    }
    
    input MessageInput {
        content: String
        author: String
   }
    
    type Message {
        id: ID!
        content: String
        author: String
   }

`);

const messages = [];

const findMessageById = (id) => messages.find(item => item?.id.toString() === id);

const rootValue = {

    getMessage: ({id}) =>  findMessageById(id),

    getAllMessages: () => messages,

    createMessage: ({input}) => {
        const message = new Message(input?.content, input?.author);
        messages.push(message);
        return message;
    },

    updateMessage: ({id, input}) => {
        const message = findMessageById(id);

        if (message !== undefined) {
            message.setContent(input.content || message.getContent());
            message.setAuthor(input.author || message.getAuthor());
        }

        return message;
    }

}


const app = express();
app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true
}));

const start = () => {
    app.listen(8080, () => {
        console.log("Server successfully started at localhost:8080");
    })
}

start();