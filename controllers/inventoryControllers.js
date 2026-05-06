const db = require("../db/queries");
const { matchedData } = require("express-validator");

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
  const { developer, title, genre } = matchedData(req);
  let developerId = await db.getDeveloperId(developer);
  if (developerId == undefined) {
    console.log("This developers doesn't exist, create new one");
    await db.addDeveloper(developer);
    developerId = await db.getDeveloperId(developer);
  }
  await db.addItem({
    developer: developerId.id,
    title: title,
    genre: genre,
  });

  res.render("success", {
    title: "add item success",
    item: { developer: developer, title: title, genre: genre },
    action: "created",
  });

  console.log("add new item successfull");
}
async function getDeleteItem(req, res) {
  const itemToBeDelete = await db.getItemById(req.query.id);
  console.log(itemToBeDelete);
  await db.deleteItemById(req.query.id);
  res.render("success", {
    title: "delete item",
    item: itemToBeDelete,
    action: "deleted",
  });
}
async function getDeleteCategory(req, res) {
  await db.deleteItemsByGenre(req.query.genre);
  res.render("deletecategory", {
    title: "delete category",
    category: req.query.genre,
  });
}

async function getUpdateItem(req, res) {
  const oldItemInfo = await db.getItemById(req.query.id);
  res.render("updateitem", {
    title: "Update info",
    oldItemInfo: oldItemInfo,
  });
}
async function updateItemPost(req, res) {
  const { id, developer, title, genre } = matchedData(req);
  //console.log({ id, developer, title, genre });
  await db.updateItem({
    id: req.body.id,
    title: req.body.title,
    genre: req.body.genre,
    developer: req.body.developer,
  });
  res.render("success", {
    title: "update success",
    item: { developer: developer, title: title, genre: genre },
    action: "updated",
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
  updateItemPost,
};
