// insert_books.js
// This script inserts sample book documents into the "books" collection of "plp_bookstore" database

const { MongoClient } = require("mongodb");

// Replace with your MongoDB connection string
const uri = "mongodb://127.0.0.1:27017"; // local MongoDB
// For MongoDB Atlas, use your cluster connection string instead

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("plp_bookstore");
    const books = database.collection("books");

    const sampleBooks = [
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        published_year: 1925,
        price: 10.99,
        in_stock: true,
        pages: 180,
        publisher: "Scribner"
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        published_year: 1960,
        price: 12.99,
        in_stock: true,
        pages: 281,
        publisher: "J.B. Lippincott & Co."
      },
      {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        published_year: 1949,
        price: 9.99,
        in_stock: true,
        pages: 328,
        publisher: "Secker & Warburg"
      },
      {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Fiction",
        published_year: 1951,
        price: 11.99,
        in_stock: false,
        pages: 214,
        publisher: "Little, Brown and Company"
      },
      {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        published_year: 1937,
        price: 14.99,
        in_stock: true,
        pages: 310,
        publisher: "George Allen & Unwin"
      },
      {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        genre: "Fantasy",
        published_year: 1997,
        price: 19.99,
        in_stock: true,
        pages: 309,
        publisher: "Bloomsbury"
      },
      {
        title: "The Da Vinci Code",
        author: "Dan Brown",
        genre: "Mystery",
        published_year: 2003,
        price: 15.99,
        in_stock: true,
        pages: 489,
        publisher: "Doubleday"
      },
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        published_year: 1813,
        price: 8.99,
        in_stock: false,
        pages: 279,
        publisher: "T. Egerton"
      },
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Adventure",
        published_year: 1988,
        price: 13.99,
        in_stock: true,
        pages: 208,
        publisher: "HarperTorch"
      },
      {
        title: "The Little Prince",
        author: "Antoine de Saint-Exupéry",
        genre: "Children",
        published_year: 1943,
        price: 7.99,
        in_stock: true,
        pages: 96,
        publisher: "Reynal & Hitchcock"
      }
    ];

    const result = await books.insertMany(sampleBooks);
    console.log(`${result.insertedCount} books inserted successfully!`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();

