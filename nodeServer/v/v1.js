const { graphql, buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
        value: String
        number: Int
    }
`);

const rootValue = {
    value: () => {
        return "Bla bla bla";
    },
    number: () => {
        return 999;
    }
}

graphql({
    schema,
    rootValue,
    source: '{ value number }'
}).then((response) => {
    console.log("Response -> ", response)
})