const { request } = require('graphql-request');

const query = `
  query {
    books {
      id
      name
      author {
        id
        name
      }
    }
  }
`;

const endpoint = 'http://localhost:4000/graphql';

request(endpoint, query)
  .then(data => console.log(data))
  .catch(error => console.error(error));
