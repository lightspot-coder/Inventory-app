const { Router } = require("express");
const inventoryController = require("../controllers/inventoryControllers");
const indexRouter = Router();

indexRouter.get("/", inventoryController.getCategories);
indexRouter.get("/category", inventoryController.getItemsByGenre);
indexRouter.get("/item", inventoryController.getItem);
indexRouter.get("/allgames", inventoryController.getAllInventory);
indexRouter.get("/additem", inventoryController.addItem_GET);
indexRouter.post("/additem", inventoryController.addItem_POST);
indexRouter.get("/deleteitem", inventoryController.getDeleteItem);
indexRouter.get("/deletecategory", inventoryController.getDeleteCategory);
indexRouter.get("/updateitem", inventoryController.getUpdateItem);
indexRouter.post("/updateitem", inventoryController.addItem_POST);

module.exports = indexRouter;
