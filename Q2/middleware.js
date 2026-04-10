function validateYear(req, res, next) {
  const { year } = req.body;

  if (!year || isNaN(year) || year < 1900 || year > 2100) {
    return res.status(400).json({ error: "Invalid year" });
  }

  next();
}
app.post("/books", validateYear, (req, res) => {
  const newBook = {
    id: books.length + 1,
    ...req.body
  };

  books.push(newBook);
  res.status(201).json(newBook);
});