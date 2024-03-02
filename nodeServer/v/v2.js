const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const {buildSchema} = require("graphql");
const User = require("../models/User");
const RandomDie = require("../models/RandomDie");

const schema = buildSchema(`
    type Query {
        text: String
        number: Int
        rollDice(numDice: Int!, numSides: Int = 6): [Int]
        getUser: User
        getDie(numSides: Int): RandomDie
        getAllMessages: [String]
    }
    
    type Mutation {
        addMessage(message: String): Boolean
    }    
    
    type User {
        name: String
        age: Int
    }
    
    type RandomDie {
        roll(numRolls: Int!): [Int]
        numSides: Int
        rollOnce: Int
    }
`);

const fakeMessagesDb = {
    messages: [],
}


const rootValue = {
    text: () => "Some random text",
    number: () => 999,
    rollDice: (args) => {
        const result = [];
        for (let i = 0; i < args.numDice; i++) {
            result.push(1 + Math.floor(Math.random() * args.numSides))
        }
        return result;
    },
    getUser: () => new User("Maksym", 17),
    getDie: (args) => new RandomDie(args.numSides),

    getAllMessages: () => fakeMessagesDb.messages,

    addMessage: ({message}) => {
        if (message.length > 5) {
            fakeMessagesDb.messages.push(message);
            return true;
        } else {
            return false;
        }
    }
};

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