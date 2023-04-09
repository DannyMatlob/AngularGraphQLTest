const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema } = require('./schema/sandwichSchema.js');
const cors = require('cors');

const app = express();


// enable CORS for all origins
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000');
})