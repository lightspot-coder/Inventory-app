const pool = require("./pool");

async function getItemByTitle(title) {
  const { rows } = await pool.query(
    "SELECT games.id,title,genre,developers.name AS developer FROM games JOIN developers ON developers.id = games.developer_id WHERE games.title = $1",
    [title],
  );
  return rows[0];
}
async function getAllItemsByGenre(genre) {
  const { rows } = await pool.query("SELECT * FROM games WHERE genre=$1", [
    genre,
  ]);
  return rows;
}
async function getCategories() {
  const { rows } = await pool.query("SELECT DISTINCT genre FROM games ");
  return rows;
}
async function getAllInventory() {
  const { rows } = await pool.query(
    "SELECT games.id,title,genre,developers.name AS developer FROM games JOIN developers ON developers.id = games.developer_id ORDER BY genre",
  );
  return rows;
}
async function addDeveloper(developer) {
  console.log(developer);
  await pool.query("INSERT INTO developers (name) VALUES ($1)", [developer]);
}
async function getDeveloperId(developer) {
  const { rows } = await pool.query(
    "SELECT id FROM developers WHERE name = $1",
    [developer],
  );
  return rows[0];
}
async function addItem(itemInfo) {
  console.log(itemInfo);
  console.log(typeof itemInfo.developer);
  await pool.query(
    "INSERT INTO games (developer_id,title,genre) VALUES ($1,$2,$3)",
    [itemInfo.developer, itemInfo.title, itemInfo.genre],
  );
}

/*
async function getAllItemsByGenre(genre) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

async function deleteTable() {
  await pool.query("DELETE FROM usernames");
}

async function getUserNamesByFilter(filter) {
  //console.log("filter by " + filter);
  const { rows } = await pool.query(
    "SELECT * FROM usernames WHERE username LIKE $1",
    ["%" + filter + "%"],
  );
  console.log(rows);
  return rows;
}
*/
module.exports = {
  getItemByTitle,
  getAllItemsByGenre,
  getCategories,
  getAllInventory,
  addDeveloper,
  getDeveloperId,
  addItem,
};
