const path = require("path");

function authHandler(req, res, next): any {
  const JWT = req.cookies.token;
  const user = checkAuth(JWT);
  if (user) {
    req.user = user;
    next();
  } else {
      if (req.originalUrl !== '/api/notes') return
    res.status(401).send('http://127.0.0.1:3000/login-page.html');
    // res.status(401).send({});
    // return;
  }
}
const Router = require("express").Router;

const authRouter = Router();

authRouter.post("/login", (req, res) => {
  const { login, pass } = req.body;
  if (login.toLowerCase() === "Jack".toLowerCase() && pass === "12345") {
    res.cookie("token", "iAmAuthorized", {
      maxAge: 86400000,
      httpOnly: true,
    });
    res.status(200).send({});
  } else {
    res.status(401).send({});
  }
});
function checkAuth(token) {
  return token === "iAmAuthorized" ? { name: "Jack" } : null;
}
module.exports = { authHandler, authRouter };
