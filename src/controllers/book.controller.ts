import { Request, Response, NextFunction } from 'express';
import Book, { IBook } from '../models/book.model'; // Import the Book model
import mongoose from 'mongoose';

// Controller to add a new book
export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, author, isbn, publicationYear, genre } = req.body;
    const userId = req.user?.userId; // Get userId from the authenticated user

    // Basic validation
    if (!title || !author) {
      return res
        .status(400)
        .json({ message: 'Title and Author are required' });
    }

    const newBook: IBook = new Book({
      title,
      author,
      isbn,
      publicationYear,
      genre,
      userId, // Associate the book with the logged-in user
    });

    await newBook.save();

    res
      .status(201)
      .json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    next(error); // Pass errors to the error handler middleware
  }
};

// Controller to get all books for the logged-in user
export const getUserBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    const books = await Book.find({ userId: userId }); // Find books matching the userId

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// Controller to get a single book by its ID
export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    const bookId = req.params.id;

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: 'Invalid Book ID format' });
    }

    const book = await Book.findOne({ _id: bookId, userId: userId }); // Find by book ID and ensure it belongs to the user

    if (!book) {
      return res.status(404).json({ message: 'Book not found or access denied' });
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

// Controller to update a book
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    const bookId = req.params.id;
    const updateData = req.body;

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: 'Invalid Book ID format' });
    }

    // Prevent updating the userId
    delete updateData.userId;

    const updatedBook = await Book.findOneAndUpdate(
      { _id: bookId, userId: userId }, // Find by book ID and ensure it belongs to the user
      updateData,
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found or access denied' });
    }

    res
      .status(200)
      .json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    next(error);
  }
};

// Controller to delete a book
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    const bookId = req.params.id;

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: 'Invalid Book ID format' });
    }

    const deletedBook = await Book.findOneAndDelete({
      _id: bookId,
      userId: userId, // Find by book ID and ensure it belongs to the user
    });

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found or access denied' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
    // Or alternatively, send a 204 No Content status:
    // res.status(204).send(); 
  } catch (error) {
    next(error);
  }
};