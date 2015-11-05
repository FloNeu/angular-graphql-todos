/*
  Simple GraphQL transport which send queries to a GraphQL endpoint
*/
function GraphQLTransport(path) {
  this.path = path || "/graphql";
}

GraphQLTransport.prototype.sendQuery = function (query, vars) {
  vars = vars || {};
  return new Promise((resolve, error) => {
    // use fetch to get the result
    fetch(this.path, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        vars
      })
    })
    // get the result as JSON
    .then(res => res.json())
    // trigger result or error
    .then(response => {
      if(response.errors) {
        return error(response.errors);
      }

      return resolve(response.data);
    })
    .catch(error);
  });
};
