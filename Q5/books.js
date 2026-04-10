app.get("/books/search", (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: "Title query required" });
  }

  const result = books.filter(book =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );

  res.json(result);
});