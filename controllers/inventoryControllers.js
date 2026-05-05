const db = require("../db/queries");

async function getItem(req, res) {
  const item = await db.getItemById(req.query.id);
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
  let developerId = await db.getDeveloperId(req.body.developer);
  if (developerId == undefined) {
    console.log("This developers doesn't exist, create new one");
    await db.addDeveloper(req.body.developer);
    developerId = await db.getDeveloperId(req.body.developer);
  }
  await db.addItem({
    developer: developerId.id,
    title: req.body.title,
    genre: req.body.genre,
  });
  res.redirect("/");
  console.log("add new item successfull");
}
async function getDeleteItem(req, res) {
  await db.deleteItemById(req.query.id);
  res.redirect("/");
}
async function getDeleteCategory(req, res) {
  await db.deleteItemsByGenre(req.query.genre);
  res.redirect("/");
}

async function getUpdateItem(req, res) {
  const oldItemInfo = await db.getItemById(req.query.id);
  await db.deleteItemById(req.query.id);
  console.log(oldItemInfo);
  res.render("updateitem", {
    title: "Update info",
    oldItemInfo: oldItemInfo,
  });
}

module.exports = {
  getCategories,
  getItemsByGenre,
  getItem,
  getAllInventory,
  addItem_GET,
  addItem_POST,
  getDeleteItem,
  getDeleteCategory,
  getUpdateItem,
};
