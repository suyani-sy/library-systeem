const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory data store for live cloud demo
let books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', available: true },
  { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', available: true },
  { id: 3, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', available: true }
];

let students = [
  { id: 1, name: 'John Doe', roll_no: 'CS101' },
  { id: 2, name: 'Jane Smith', roll_no: 'CS102' }
];

let issuedBooks = [];

// Routes
app.get('/', (req, res) => {
  res.send('Campus Library Management API is running live!');
});

app.get('/books', (req, res) => res.json(books));

app.post('/books', (req, res) => {
  const newBook = { id: books.length + 1, ...req.body, available: true };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.get('/students', (req, res) => res.json(students));

app.post('/students', (req, res) => {
  const newStudent = { id: students.length + 1, ...req.body };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.get('/issued-books', (req, res) => res.json(issuedBooks));

app.post('/issue-book', (req, res) => {
  const { book_id, student_id } = req.body;
  const book = books.find(b => b.id == book_id);
  if (book) book.available = false;
  const issueRecord = { id: issuedBooks.length + 1, book_id, student_id, issue_date: new Date().toISOString().split('T')[0] };
  issuedBooks.push(issueRecord);
  res.status(201).json(issueRecord);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});