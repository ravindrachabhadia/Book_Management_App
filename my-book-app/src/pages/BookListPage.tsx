import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Keep Link for Edit button
import { useAuth } from '../context/AuthContext';
import { getBooks, deleteBook, Book } from '../services/bookService';
// Import Mantine components
import { List, Button, Text, Loader, Alert, Stack, Group, Title, Container } from '@mantine/core';
import { IconAlertCircle, IconTrash, IconEdit } from '@tabler/icons-react'; // Removed IconPlus

const BookListPage = () => {
  const { token } = useAuth(); // Removed logout from here, Navbar handles it
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Removed useNavigate as the button using it was removed

  useEffect(() => {
    const fetchBooks = async () => {
      if (!token) {
        setError('Authentication token not found.');
        setIsLoading(false);
        return; 
      }
      try {
        setIsLoading(true);
        setError(null);
        const fetchedBooks = await getBooks(token);
        setBooks(fetchedBooks);
      } catch (err: any) {
        console.error('Failed to fetch books:', err);
        setError(err.message || 'Failed to load books.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, [token]); 

  const handleDelete = async (bookId: string) => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return;
    }
    if (!token) {
      setError('Authentication error.');
      return;
    }
    try {
      await deleteBook(bookId, token);
      setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
      console.log('Book deleted successfully');
    } catch (err: any) {
      console.error('Failed to delete book:', err);
      setError(err.message || 'Failed to delete book.');
    }
  };

  // Removed handleLogout function

  // --- Render Logic ---
  let content;
  if (isLoading) {
    content = <Loader />; 
  } else if (error) {
    content = (
      <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red" mt="md">
        {error}
      </Alert>
    );
  } else if (books.length === 0) {
    content = <Text mt="md">You haven't added any books yet.</Text>;
  } else {
    content = (
      <List spacing="xs" size="sm" mt="md" withPadding>
        {books.map((book) => (
          <List.Item
            key={book._id}
            styles={{ itemWrapper: { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' } }}
          >
            <Stack gap="xs">
               <Text fw={500}>{book.title}</Text>
               <Text size="sm" c="dimmed">by {book.author} {book.publicationYear && `(${book.publicationYear})`}</Text>
            </Stack>
            <Group gap="xs">
              <Button
                component={Link} 
                to={`/edit-book/${book._id}`}
                variant="outline"
                size="xs"
                leftSection={<IconEdit size={14} />}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                color="red"
                size="xs"
                onClick={() => handleDelete(book._id)}
                leftSection={<IconTrash size={14} />}
              >
                Delete
              </Button>
            </Group>
          </List.Item>
        ))}
      </List>
    );
  }

  return (
    <Container size="md" px="xs" style={{ marginTop: '30px' }}> 
       {/* Removed the top Group containing Title, Add Book, and Logout buttons */}
       {/* The Title is now typically part of the Navbar or page content below */}
       <Title order={2} mb="xl">Your Books</Title> {/* Added Title here instead */}
       
       {content} 
    </Container>
  );
};

export default BookListPage;