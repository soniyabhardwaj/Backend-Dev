app.get("/books", (req, res) => {
  let { page = 1, limit = 2 } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedBooks = books.slice(startIndex, endIndex);

  res.json({
    total: books.length,
    page,
    limit,
    data: paginatedBooks
  });
});