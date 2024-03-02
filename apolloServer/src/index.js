const fs = require("fs");
const path = require("path");
const {ApolloServer} = require("apollo-server");
const {PrismaClient} = require("@prisma/client");
const {PubSub} = require("apollo-server");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Link = require("./resolvers/Link");
const User = require("./resolvers/User");
const Subscription = require("./resolvers/Subscription");
const {getUserId} = require("./utils");

const prisma = new PrismaClient();
const pubsub = new PubSub();

const resolvers = {
    Query,
    Mutation,
    User,
    Link,
    Subscription
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, "schema.graphql"), "utf-8"
    ),
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            userId: req && req.headers.authorization ? getUserId(req) : null,
            pubsub
        }
    }
});

server
    .listen()
    .then(serverInfo => {
        console.log("Server started on URL:", serverInfo.url);
        console.log("##### On port:", serverInfo.port, " #####");
    });
