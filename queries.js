// queries.js
// MongoDB queries for plp_bookstore.books

// Connect to database (use mongosh or MongoClient in Node.js)
use plp_bookstore;

// 1️⃣ Find all books in a specific genre
db.books.find({ genre: "Fantasy" });

// 2️⃣ Find books published after a certain year
db.books.find({ published_year: { $gt: 2015 } });

// 3️⃣ Find books by a specific author
db.books.find({ author: "J.K. Rowling" });

// 4️⃣ Update the price of a specific book
db.books.updateOne(
  { title: "Laptop" },
  { $set: { price: 1300 } }
);

// 5️⃣ Delete a book by its title
db.books.deleteOne({ title: "Old Book" });

// 6️⃣ Find books that are in stock AND published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// 7️⃣ Projection: return only title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// 8️⃣ Sort by price ascending
db.books.find().sort({ price: 1 });

// 9️⃣ Sort by price descending
db.books.find().sort({ price: -1 });

// 🔟 Pagination: 5 books per page, page 1
db.books.find().skip(0).limit(5);

// Pagination: page 2
db.books.find().skip(5).limit(5);

// 1️⃣1️⃣ Aggregation: average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// 1️⃣2️⃣ Aggregation: author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// 1️⃣3️⃣ Aggregation: count books by publication decade
db.books.aggregate([
  {
    $group: {
      _id: { $concat: [ { $substr: [ "$published_year", 0, 3 ] }, "0s" ] },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);

// 1️⃣4️⃣ Create index on title
db.books.createIndex({ title: 1 });

// 1️⃣5️⃣ Create compound index on author + published_year
db.books.createIndex({ author: 1, published_year: -1 });

// 1️⃣6️⃣ Explain query performance
db.books.find({ title: "Laptop" }).explain("executionStats");
db.books.find({ author: "J.K. Rowling", published_year: { $gt: 2010 } }).explain("executionStats");
