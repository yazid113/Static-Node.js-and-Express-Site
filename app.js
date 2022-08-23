const express = require("express");
const { projects } = require("./data.json");
const app = express();
let err = new Error();

app.set("view engine", "pug");

app.use("/static", express.static(`public`));

app.get("/", function (req, res) {
  res.render("index", { projects });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/project/:id", function (req, res, next) {
  const projectId = req.params.id;
  const project = projects.find(({ id }) => id === parseInt(projectId));

  if (project) {
    res.render("project", { project });
  } else {
    err.message = `Not found, it looks like the page you're looking for does not exist`;
    err.status = 404;
    console.log(err);
    next(err);
  }
});

app.get("/error", (req, res, next) => {
  err.message = `Server error`;
  err.status = 500;
  console.log(err);
  next(err);
});

app.use((req, res, next) => {
  err.message = `Not found, it looks like the page you're looking for does not exist`;
  err.status = 404;
  console.log(err);
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  if (err.status === 404) {
    res.render("page-not-found", { err });
  } else if (err.status === 500) {
    res.render("error", { err });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("The app is running on localhost:3000");
});
