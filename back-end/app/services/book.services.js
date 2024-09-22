const dbConnection = require("../../database/connection_mysl");
const util = require("util");

// chỉ admin mới có quyền xem hết
const list = async (searchQuery) => {
  const showDataSql = util.promisify(dbConnection.query).bind(dbConnection);
  let url = await `SELECT * FROM books ORDER BY created_at DESC`;
  let param = [];
  if (searchQuery) {
    url = "SELECT * FROM books name LIKE ? ORDER BY created_at DESC";
    param = [`%${searchQuery}%`];
  }
  const result = await showDataSql(url, param);
  return result;
};

const getBooks = async (conditions, page = 1, limit = 10) => {
  try {
    const showDataSql = util.promisify(dbConnection.query).bind(dbConnection);

    const offset = (page - 1) * limit;
    const param = [];
    let query = `SELECT* FROM books WHERE user_id = ?`;
    param.push(conditions.user_id);

    if (conditions.name) {
      query += `AND name LIKE ?`;
      param.push(`%${conditions.name}%`);
    }

    if (conditions.time_boos) {
      query += `AND time_boos LIKE ?`;
      param.push(`%${conditions.time_boos}%`);
    }

    query += `LIMIT ? OFFSET ?`;
    param.push(limit, offset);
    const result = await showDataSql(query, param);
    const url = `SELECT COUNT(*) AS count  FROM books WHERE user_id = ?`;
    const data = await showDataSql(url, [conditions.user_id]);
    const total = data[0].count;
    console.log(total);

    const totalPage = Math.ceil(total / limit);
    return {
      data: result,
      meta: {
        total,
        totalPage,
        page: page,
        limit: limit,
      },
    };
  } catch (error) {
    throw error;
  }
};

// list user books
const listBookUser = async (userId) => {
  const showDataSql = util.promisify(dbConnection.query).bind(dbConnection);
  const selectQuery = `SELECT * FROM books WHERE user_id = ?`;
  const results = await showDataSql(selectQuery, [userId]);
  return results;
};

const show = async (id) => {
  const showDataSql = util.promisify(dbConnection.query).bind(dbConnection);
  const selectQuery = "SELECT * FROM books WHERE id ? LIMIT 1";
  const results = await showDataSql(selectQuery, [id]);
  return results[0];
};
const add = async (data) => {
  const showDataSql = util.promisify(dbConnection.query).bind(dbConnection);
  const url = `INSERT INTO books SET ?`;
  await showDataSql(url, data);

  const selectQuery = "SELECT * FROM books ORDER BY created_at DESC LIMIT 1";
  const results = await showDataSql(selectQuery);
  return results[0];
};

const edit = async (id, data) => {
  const showDataSql = util.promisify(dbConnection.query).bind(dbConnection);
  const updateQuery = "UPDATE books SET ? WHERE id = ?";
  await showDataSql(updateQuery, [data, id]);

  const url = `SELECT * FROM books WHERE id = ? LIMIT 1`;
  const query = util.promisify(dbConnection.query).bind(dbConnection);
  const result = await query(url, [id]);
  return result[0];
};

const remove = async (id) => {
  try {
    const showDataSql = util.promisify(dbConnection.query).bind(dbConnection);
    const deleteQuery = "DELETE FROM books WHERE id = ?";
    await showDataSql(deleteQuery, [id]);
    return true;
  } catch (error) {
    throw new Error("remove err");
  }
};

module.exports = {
  list,
  add,
  edit,
  remove,
  show,
  getBooks,
  listBookUser,
};
