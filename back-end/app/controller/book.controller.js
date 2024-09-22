const { parse } = require("dotenv");
const bookService = require("../services/book.services");
const { v4: uuidv4 } = require("uuid");
const index = async (req, res) => {
  try {
    const name = req.query.name || "";
    const books = await bookService.list(name);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error list book", error: error.message });
  }
};

const listBookByUser = async (req, res) => {
  try {
    const reqAll = req.query;
    const page = parseInt(reqAll.page) || 1;
    const limit = parseInt(reqAll.limit) || 10;
    if (req.user) {
      const query = {
        user_id: req.user.id,
        name: reqAll.name || "",
        time_boos: reqAll.time_boos || "",
      };

      const books = await bookService.getBooks(query, page, limit);

      res.status(200).json(books);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error listBookByUser book", error: error.message });
  }
};

const store = async (req, res) => {
  try {
    if (req.user) {
      const newData = req.body;
      const book = await bookService.add({
        ...newData,
        user_id: req.user.id,
        id: uuidv4(),
        created_at: new Date(),
      });
      res.status(201).json(book);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding book", error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updateData = req.body;
    const books = await bookService.edit(bookId, updateData);
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error update book", error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const bookId = req.params.id;
    const books = await bookService.remove(bookId);
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error delete book", error: error.message });
  }
};

const showDetail = async (req, res) => {
  try {
    const bookId = req.params.id;
    const books = await bookService.show(bookId);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error show book", error: error.message });
  }
};

module.exports = {
  index,
  store,
  update,
  remove,
  listBookByUser,
  showDetail,
};
