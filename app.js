const Express = require("express");
const app = Express();
const indexRouter = require("./routes/index");
const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(Express.urlencoded({ extended: true }));

app.get("/", indexRouter);
app.get("/category", indexRouter);
app.get("/item", indexRouter);
app.get("/allgames", indexRouter);
app.get("/additem", indexRouter);
app.post("/additem", indexRouter);

app.listen(3000, () => {
  console.log("Listening on the port 3000...");
});
