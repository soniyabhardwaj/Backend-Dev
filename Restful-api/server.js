const express = require("express");
const app = express();

app.use(express.json());

let books = [
  { id: 1, title: "Book A", author: "John", year: 2020 },
  { id: 2, title: "Book B", author: "Mary", year: 2018 },
  { id: 3, title: "Book C", author: "John", year: 2022 }
];

let authors = [];

app.listen(3000, () => console.log("Server running on port 3000"));