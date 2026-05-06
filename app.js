const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.get("/", indexRouter);
app.get("/category", indexRouter);
app.get("/item", indexRouter);
app.get("/allgames", indexRouter);
app.get("/additem", indexRouter);
app.post("/additem", indexRouter);
app.get("/deleteitem", indexRouter);
app.get("/deletecategory", indexRouter);
app.get("/updateitem", indexRouter);
app.post("/updateitem", indexRouter);

app.listen(3000, () => {
  console.log("Listening on the port 3000...");
});
