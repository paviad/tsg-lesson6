const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

var loggedInUsers = {};

server.use(jsonServer.bodyParser);

server.post('/login/:username', function (req, res) {
  var username = req.params.username;

  // Make sure username was specified
  if (!username) {
    res.sendStatus(401);
    return;
  }

  // Compare password to 'foo'
  if (req.body.password !== 'foo') {
    res.sendStatus(401);
    return;
  }

  // Generate a user token and add it to the loggedInUsers map
  var uuid = guid();
  loggedInUsers[uuid] = username;

  // Return the token in the response
  res.json({ token: uuid });
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

server.use((req, res, next) => {
  if (isAuthorized(req)) { // add your authorization logic here
    next(); // continue to JSON Server router
  }
  else {
    res.sendStatus(401);
  }
});

function isAuthorized(req) {
  // authorization: Bearer ****************
  var auth = req.headers['authorization'];
  var token = auth && auth.substring(7);

  return !!token;
}

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
