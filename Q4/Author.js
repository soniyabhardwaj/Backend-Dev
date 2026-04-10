app.post("/authors", (req, res) => {
  const newAuthor = {
    id: authors.length + 1,
    name: req.body.name
  };

  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});
app.get("/authors", (req, res) => {
  res.json(authors);
});
app.get("/authors/:id", (req, res) => {
  const author = authors.find(a => a.id == req.params.id);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  res.json(author);
});
app.put("/authors/:id", (req, res) => {
  const author = authors.find(a => a.id == req.params.id);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  author.name = req.body.name;
  res.json(author);
});
app.delete("/authors/:id", (req, res) => {
  authors = authors.filter(a => a.id != req.params.id);
  res.json({ message: "Author deleted" });
});