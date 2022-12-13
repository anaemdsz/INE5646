const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./jwt");
const { User } = require("../models/user");

const unAuthenticatedRoutes = ["/create-user", "/login"];

module.exports = {
  authenticate: (req, res, next) => {
    const route = req.originalUrl.split("?")[0];
    console.log("New request received for route: ", route);
    console.log("Authenticating request");
    const authToken = req.cookies.authorization;

    if (authToken === "" || !authToken) {
      console.log("User is not authenticated.");
      if (!unAuthenticatedRoutes.includes(route)) {
        console.log(
          `Access denied to route '${req.originalUrl}', user is not authenticated`
        );
        res.redirect("/login?errorCode=2");
      }
      next();
      return;
    }

    try {
      const payload = jwt.verify(authToken, jwtSecret);
      console.log("Valid token, payload: ", { payload });

      const user = new User(req.database).find({ username: payload.username });
      if (!user)
        throw new Error(
          "Token is valid but the user was not found. Maybe the user was deleted?"
        );

      req.user = user;
      console.log("User succesfully authenticated.");
    } catch (error) {
      console.log("Failed to authenticate user: ", { error });
    }

    next();
  },
};
