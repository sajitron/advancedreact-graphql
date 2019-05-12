const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config({
  path: "variables.env"
});
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// @TODO Use express middleware to handle cookies(JWT)
server.express.use(cookieParser());
// @TODO Use express middleware to populate current user

// decode the JWT so we can get the user on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the user id on the req for further requests to access
    req.userId = userId;
  }
  next();
});

// Create a middleware that populates the user on each request
server.express.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next();
  const user = await db.query.user(
    {
      where: {
        id: req.userId
      }
    },
    "{id, permissions, email, name}" // we want these details from the logged in user
  );
  // we place the populated user object on the request object so we can have access to the user details eg permissions for use in places like permissions.js
  req.user = user;
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is now running on https://localhost${deets.port}`);
  }
);
