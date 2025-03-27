import axios, { AxiosError } from 'axios';

// Define the base URL of your books API
// Make sure this matches where your backend is running
const API_URL = 'http://localhost:5000/api/books';

// Define a basic interface for the Book data expected from the backend
interface AddBookData {
    title: string;
    author: string;
    isbn?: string;
    publicationYear?: number;
    genre?: string;
  }
// Adjust fields based on your Book model (src/models/book.model.ts)
export interface Book {
  _id: string;
  title: string;
  author: string;
  isbn?: string;
  publicationYear?: number;
  genre?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
export const addBook = async (bookData: AddBookData, token: string): Promise<Book> => {
    try {
      // Make a POST request to the /books endpoint
      const response = await axios.post<Book>(`${API_URL}/`, bookData, { // Send bookData in request body
        headers: {
          Authorization: `Bearer ${token}`, // Include auth token
        },
      });
      return response.data; // Return the newly created book data from backend
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to add book.');
      } else {
        throw new Error('Failed to add book due to a network or server issue.');
      }
    }
  };

// Function to get all books for the logged-in user
export const getBooks = async (token: string): Promise<Book[]> => {
  try {
    // Make a GET request to the /books endpoint, sending the token
    const response = await axios.get<Book[]>(`${API_URL}/`, {
      headers: {
        // Include the JWT token in the Authorization header
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the array of books
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Handle potential errors (e.g., 401 Unauthorized if token is invalid)
      throw new Error(error.response.data.message || 'Failed to fetch books.');
    } else {
      throw new Error('Failed to fetch books due to a network or server issue.');
    }
  }
};

// Add this function within src/services/bookService.ts

// Function to delete a book by its ID
export const deleteBook = async (bookId: string, token: string): Promise<{ message: string }> => {
    try {
      // Make a DELETE request to the /books/:id endpoint
      const response = await axios.delete<{ message: string }>(`${API_URL}/${bookId}`, { // Add bookId to URL
        headers: {
          Authorization: `Bearer ${token}`, // Include auth token
        },
      });
      return response.data; // Return success message from backend
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to delete book.');
      } else {
        throw new Error('Failed to delete book due to a network or server issue.');
      }
    }
  };
  

  interface UpdateBookData {
    title?: string;
    author?: string;
    isbn?: string;
    publicationYear?: number;
    genre?: string;
  }
  
  // Function to get a single book by its ID
  export const getBookById = async (bookId: string, token: string): Promise<Book> => {
    try {
      const response = await axios.get<Book>(`${API_URL}/${bookId}`, { // Use GET /api/books/:id
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch book details.');
      } else {
        throw new Error('Failed to fetch book details due to a network or server issue.');
      }
    }
  };
  
  // Function to update an existing book
  export const updateBook = async (bookId: string, bookData: UpdateBookData, token: string): Promise<Book> => {
    try {
      // Make a PUT request to the /books/:id endpoint
      const response = await axios.put<Book>(`${API_URL}/${bookId}`, bookData, { // Send update data
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return the updated book data from backend
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to update book.');
      } else {
        throw new Error('Failed to update book due to a network or server issue.');
      }
    }
  };
  
  // --- Keep getBooks and addBook functions ---
  // --- TODO: Add updateBook later ---