const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const validateItem = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("title can not be empty")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("title must only contain letters and numbers"),
  body("developer")
    .trim()
    .notEmpty()
    .withMessage("developer name can not be empty")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("developer name only contain letter and numbers"),
  body("genre").notEmpty().withMessage("Select one genre"),
];

const validateForm = [
  validateItem,
  (req, res, next) => {
    console.log(req.body.title);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("additem", {
        title: "add item error",
        errors: errors.array(),
      });
    }
    next();
  },
];
const validateUpdateForm = [
  validateItem,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const oldItemInfo = await db.getItemById(req.body.id);
      return res.status(400).render("updateitem", {
        title: "update item error",
        errors: errors.array(),
        oldItemInfo: oldItemInfo,
      });
    }
    next();
  },
];
module.exports = {
  validateForm,
  validateUpdateForm,
};
