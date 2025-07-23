const { validateToken } = require("../Services/Authentication.js");

function checkForAuthentication(cookieName = "token") {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    console.log("Middleware Token cookie value: ", tokenCookieValue);
    if (!tokenCookieValue) {
      return res.status(401).json({ error: "User is not authenticated!" });
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      if (!userPayload || !userPayload.userId) {
        return res
          .status(401)
          .json({ error: "Error arose while validating user token!" });
      }
      req.user = userPayload;
      console.log("User payload in middleware: ", req.user);
      next();
    } catch (error) {
      console.log("Error in middleware while checking token!", error);
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}

module.exports = { checkForAuthentication };
