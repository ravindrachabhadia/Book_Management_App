import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { addBook } from '../services/bookService';
// Import Mantine components
import { TextInput, NumberInput, Button, Paper, Title, Container, Alert, Group } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

const AddBookPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  
  // Keep state for form fields
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [isbn, setIsbn] = useState<string>('');
  // Use number | string for NumberInput flexibility if needed, or just string
  const [publicationYear, setPublicationYear] = useState<string | number>(''); 
  const [genre, setGenre] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!token) {
      setError('Authentication error. Please log in again.');
      setIsLoading(false);
      return;
    }

    // Prepare data payload
    const bookData = {
      title,
      author,
      isbn: isbn || undefined, 
      // Convert publicationYear state to number for API
      publicationYear: publicationYear ? Number(publicationYear) : undefined, 
      genre: genre || undefined,
    };

    // Validate number conversion
    if (publicationYear && isNaN(bookData.publicationYear!)) {
         setError('Publication Year must be a valid number.');
         setIsLoading(false);
         return;
    }

    try {
      await addBook(bookData, token);
      console.log('Book added successfully');
      navigate('/'); // Navigate back to the book list page on success
    } catch (err: unknown) { // <--- Change 'any' to 'unknown'
      console.error('Operation failed:', err); // Keep logging the raw error for debugging
  
      // Determine the error message safely
      let message = 'An unexpected error occurred.'; // Default message
      if (err instanceof Error) {
          // If it's an Error object, use its message property
          message = err.message; 
      } else if (typeof err === 'string') {
          // If the caught value is just a string, use it directly
          message = err;
      } 
      // Add more checks here if errors could be other types
  
      setError(message); // Update the error state with the determined message
  
      // Make sure to reset loading state if applicable within the catch block
      if (typeof setIsLoading === 'function') { // Check if setIsLoading exists
           setIsLoading(false);
      }
  }
  };

  return (
    <Container size="xs" px="xs" style={{ marginTop: '50px' }}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} ta="center" mb="xl">
          Add New Book
        </Title>

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            placeholder="Book title"
            required
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
            disabled={isLoading}
            mb="md"
          />
          <TextInput
            label="Author"
            placeholder="Author's name"
            required
            value={author}
            onChange={(event) => setAuthor(event.currentTarget.value)}
            disabled={isLoading}
            mb="md"
          />
          <TextInput
            label="ISBN"
            placeholder="ISBN (optional)"
            value={isbn}
            onChange={(event) => setIsbn(event.currentTarget.value)}
            disabled={isLoading}
            mb="md"
          />
          <NumberInput // Use NumberInput for year
            label="Publication Year"
            placeholder="Year (optional)"
            value={publicationYear}
            onChange={setPublicationYear} // Directly set state (string or number)
            disabled={isLoading}
            mb="md"
            hideControls // Optional: hide +/- spinners
          />
          <TextInput
            label="Genre"
            placeholder="Genre (optional)"
            value={genre}
            onChange={(event) => setGenre(event.currentTarget.value)}
            disabled={isLoading}
            mb="lg"
          />

          {error && (
             <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red" withCloseButton onClose={() => setError(null)} mb="md">
               {error}
             </Alert>
           )}

          <Group justify="flex-end" mt="xl"> {/* Align buttons to the end */}
             <Button variant="default" onClick={() => navigate('/')} disabled={isLoading}> 
               Cancel
             </Button>
             <Button type="submit" loading={isLoading}>
               Add Book
             </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default AddBookPage;