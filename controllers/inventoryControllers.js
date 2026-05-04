const db = require("../db/queries");

async function getItem(req, res) {
  const item = await db.getItemByTitle(req.query.title);
  res.render("item", {
    title: "game info",
    item: item,
  });
}

async function getCategories(req, res) {
  const categories = await db.getCategories();
  res.render("index", {
    title: "Games inventory",
    categories: categories,
  });
}
async function getItemsByGenre(req, res) {
  const items = await db.getAllItemsByGenre(req.query.genre);
  res.render("category", {
    title: req.query.genre,
    items: items,
  });
}
async function getAllInventory(req, res) {
  const allInventory = await db.getAllInventory();
  res.render("allItems", {
    title: "All inventory",
    items: allInventory,
  });
}

function addItem_GET(req, res) {
  res.render("additem", {
    title: "Add item form",
  });
}

async function addItem_POST(req, res) {
  console.log(req.body.genre);
  await db.addDeveloper(req.body.developer);
  const developerId = await db.getDeveloperId(req.body.developer);
  await db.addItem({
    developer: developerId.id,
    title: req.body.title,
    genre: req.body.genre,
  });
  res.redirect("/");
  console.log("add new item successfull");
}

module.exports = {
  getCategories,
  getItemsByGenre,
  getItem,
  getAllInventory,
  addItem_GET,
  addItem_POST,
};
