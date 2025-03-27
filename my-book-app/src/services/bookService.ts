import axios from 'axios'; // Corrected import

// Define the base URL of your books API
// Make sure this matches where your backend is running
const API_URL = 'http://localhost:5000/api/books';

// --- Interfaces ---

// Interface for the data needed to create a book
interface AddBookData {
  title: string;
  author: string;
  isbn?: string;
  publicationYear?: number;
  genre?: string;
}

// Interface for the full Book data expected from the backend
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

// Interface for the data needed to update a book (allow partial updates)
interface UpdateBookData {
  title?: string;
  author?: string;
  isbn?: string;
  publicationYear?: number;
  genre?: string;
}


// --- Service Functions ---

// Function to get all books for the logged-in user
export const getBooks = async (token: string): Promise<Book[]> => {
  try {
    const response = await axios.get<Book[]>(`${API_URL}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch books.');
    } else {
      throw new Error('Failed to fetch books due to a network or server issue.');
    }
  }
};

// Function to get a single book by its ID
export const getBookById = async (bookId: string, token: string): Promise<Book> => {
  try {
    const response = await axios.get<Book>(`${API_URL}/${bookId}`, { 
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

// Function to add a new book
export const addBook = async (bookData: AddBookData, token: string): Promise<Book> => {
  try {
    const response = await axios.post<Book>(`${API_URL}/`, bookData, { 
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to add book.');
    } else {
      throw new Error('Failed to add book due to a network or server issue.');
    }
  }
};

// Function to update an existing book
export const updateBook = async (bookId: string, bookData: UpdateBookData, token: string): Promise<Book> => {
  try {
    const response = await axios.put<Book>(`${API_URL}/${bookId}`, bookData, { 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to update book.');
    } else {
      throw new Error('Failed to update book due to a network or server issue.');
    }
  }
};

// Function to delete a book by its ID
export const deleteBook = async (bookId: string, token: string): Promise<{ message: string }> => {
  try {
    const response = await axios.delete<{ message: string }>(`${API_URL}/${bookId}`, { 
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to delete book.');
    } else {
      throw new Error('Failed to delete book due to a network or server issue.');
    }
  }
};