import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware'; // Import the authentication middleware

// Import controller functions (we will create these in the next step)
import {
  addBook,
  getUserBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/book.controller'; // Assuming controllers are in book.controller.ts

const router = Router();

// --- Book Routes ---
// All book routes require authentication, so we apply the middleware first.

// POST /api/books - Add a new book
router.post('/', authenticate, addBook);

// GET /api/books - Get all books for the logged-in user
router.get('/', authenticate, getUserBooks);

// GET /api/books/:id - Get a single book by its ID
router.get('/:id', authenticate, getBookById);

// PUT /api/books/:id - Update a book by its ID
router.put('/:id', authenticate, updateBook);

// DELETE /api/books/:id - Delete a book by its ID
router.delete('/:id', authenticate, deleteBook);


export default router;