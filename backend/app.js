const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema } = require('./schema/schema.js');
const app = express();

console.log(schema.name);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000');
})